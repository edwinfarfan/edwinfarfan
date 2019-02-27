import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITipoCambioCd } from 'app/shared/model/tipo-cambio-cd.model';
import { AccountService } from 'app/core';
import { TipoCambioCdService } from './tipo-cambio-cd.service';

@Component({
    selector: '-tipo-cambio-cd',
    templateUrl: './tipo-cambio-cd.component.html'
})
export class TipoCambioCdComponent implements OnInit, OnDestroy {
    tipoCambios: ITipoCambioCd[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected tipoCambioService: TipoCambioCdService,
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
            this.tipoCambioService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<ITipoCambioCd[]>) => res.ok),
                    map((res: HttpResponse<ITipoCambioCd[]>) => res.body)
                )
                .subscribe((res: ITipoCambioCd[]) => (this.tipoCambios = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.tipoCambioService
            .query()
            .pipe(
                filter((res: HttpResponse<ITipoCambioCd[]>) => res.ok),
                map((res: HttpResponse<ITipoCambioCd[]>) => res.body)
            )
            .subscribe(
                (res: ITipoCambioCd[]) => {
                    this.tipoCambios = res;
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
        this.registerChangeInTipoCambios();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITipoCambioCd) {
        return item.id;
    }

    registerChangeInTipoCambios() {
        this.eventSubscriber = this.eventManager.subscribe('tipoCambioListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
