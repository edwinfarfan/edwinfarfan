import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITipoCambioVariacionCd } from 'app/shared/model/tipo-cambio-variacion-cd.model';
import { AccountService } from 'app/core';
import { TipoCambioVariacionCdService } from './tipo-cambio-variacion-cd.service';

@Component({
    selector: '-tipo-cambio-variacion-cd',
    templateUrl: './tipo-cambio-variacion-cd.component.html'
})
export class TipoCambioVariacionCdComponent implements OnInit, OnDestroy {
    tipoCambioVariacions: ITipoCambioVariacionCd[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected tipoCambioVariacionService: TipoCambioVariacionCdService,
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
            this.tipoCambioVariacionService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<ITipoCambioVariacionCd[]>) => res.ok),
                    map((res: HttpResponse<ITipoCambioVariacionCd[]>) => res.body)
                )
                .subscribe(
                    (res: ITipoCambioVariacionCd[]) => (this.tipoCambioVariacions = res),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.tipoCambioVariacionService
            .query()
            .pipe(
                filter((res: HttpResponse<ITipoCambioVariacionCd[]>) => res.ok),
                map((res: HttpResponse<ITipoCambioVariacionCd[]>) => res.body)
            )
            .subscribe(
                (res: ITipoCambioVariacionCd[]) => {
                    this.tipoCambioVariacions = res;
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
        this.registerChangeInTipoCambioVariacions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITipoCambioVariacionCd) {
        return item.id;
    }

    registerChangeInTipoCambioVariacions() {
        this.eventSubscriber = this.eventManager.subscribe('tipoCambioVariacionListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
