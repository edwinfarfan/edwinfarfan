import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMonedaCd } from 'app/shared/model/moneda-cd.model';
import { AccountService } from 'app/core';
import { MonedaCdService } from './moneda-cd.service';

@Component({
    selector: '-moneda-cd',
    templateUrl: './moneda-cd.component.html'
})
export class MonedaCdComponent implements OnInit, OnDestroy {
    monedas: IMonedaCd[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected monedaService: MonedaCdService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected activatedRoute: ActivatedRoute,
        protected accountService: AccountService
    ) {
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.monedaService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IMonedaCd[]>) => res.ok),
                    map((res: HttpResponse<IMonedaCd[]>) => res.body)
                )
                .subscribe((res: IMonedaCd[]) => (this.monedas = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.monedaService
            .query()
            .pipe(
                filter((res: HttpResponse<IMonedaCd[]>) => res.ok),
                map((res: HttpResponse<IMonedaCd[]>) => res.body)
            )
            .subscribe(
                (res: IMonedaCd[]) => {
                    this.monedas = res;
                    this.currentSearch = '';
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMonedas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMonedaCd) {
        return item.id;
    }

    registerChangeInMonedas() {
        this.eventSubscriber = this.eventManager.subscribe('monedaListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
