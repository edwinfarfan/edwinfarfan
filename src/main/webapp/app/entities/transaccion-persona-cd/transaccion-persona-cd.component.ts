import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITransaccionPersonaCd } from 'app/shared/model/transaccion-persona-cd.model';
import { AccountService } from 'app/core';
import { TransaccionPersonaCdService } from './transaccion-persona-cd.service';

@Component({
    selector: '-transaccion-persona-cd',
    templateUrl: './transaccion-persona-cd.component.html'
})
export class TransaccionPersonaCdComponent implements OnInit, OnDestroy {
    transaccionPersonas: ITransaccionPersonaCd[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected transaccionPersonaService: TransaccionPersonaCdService,
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
            this.transaccionPersonaService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<ITransaccionPersonaCd[]>) => res.ok),
                    map((res: HttpResponse<ITransaccionPersonaCd[]>) => res.body)
                )
                .subscribe(
                    (res: ITransaccionPersonaCd[]) => (this.transaccionPersonas = res),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.transaccionPersonaService
            .query()
            .pipe(
                filter((res: HttpResponse<ITransaccionPersonaCd[]>) => res.ok),
                map((res: HttpResponse<ITransaccionPersonaCd[]>) => res.body)
            )
            .subscribe(
                (res: ITransaccionPersonaCd[]) => {
                    this.transaccionPersonas = res;
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
        this.registerChangeInTransaccionPersonas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITransaccionPersonaCd) {
        return item.id;
    }

    registerChangeInTransaccionPersonas() {
        this.eventSubscriber = this.eventManager.subscribe('transaccionPersonaListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
