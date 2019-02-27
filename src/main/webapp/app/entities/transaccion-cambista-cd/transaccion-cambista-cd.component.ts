import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITransaccionCambistaCd } from 'app/shared/model/transaccion-cambista-cd.model';
import { AccountService } from 'app/core';
import { TransaccionCambistaCdService } from './transaccion-cambista-cd.service';

@Component({
    selector: '-transaccion-cambista-cd',
    templateUrl: './transaccion-cambista-cd.component.html'
})
export class TransaccionCambistaCdComponent implements OnInit, OnDestroy {
    transaccionCambistas: ITransaccionCambistaCd[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected transaccionCambistaService: TransaccionCambistaCdService,
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
            this.transaccionCambistaService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<ITransaccionCambistaCd[]>) => res.ok),
                    map((res: HttpResponse<ITransaccionCambistaCd[]>) => res.body)
                )
                .subscribe(
                    (res: ITransaccionCambistaCd[]) => (this.transaccionCambistas = res),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.transaccionCambistaService
            .query()
            .pipe(
                filter((res: HttpResponse<ITransaccionCambistaCd[]>) => res.ok),
                map((res: HttpResponse<ITransaccionCambistaCd[]>) => res.body)
            )
            .subscribe(
                (res: ITransaccionCambistaCd[]) => {
                    this.transaccionCambistas = res;
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
        this.registerChangeInTransaccionCambistas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITransaccionCambistaCd) {
        return item.id;
    }

    registerChangeInTransaccionCambistas() {
        this.eventSubscriber = this.eventManager.subscribe('transaccionCambistaListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
