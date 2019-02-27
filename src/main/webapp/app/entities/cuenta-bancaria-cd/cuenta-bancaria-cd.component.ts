import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICuentaBancariaCd } from 'app/shared/model/cuenta-bancaria-cd.model';
import { AccountService } from 'app/core';
import { CuentaBancariaCdService } from './cuenta-bancaria-cd.service';

@Component({
    selector: '-cuenta-bancaria-cd',
    templateUrl: './cuenta-bancaria-cd.component.html'
})
export class CuentaBancariaCdComponent implements OnInit, OnDestroy {
    cuentaBancarias: ICuentaBancariaCd[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected cuentaBancariaService: CuentaBancariaCdService,
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
            this.cuentaBancariaService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<ICuentaBancariaCd[]>) => res.ok),
                    map((res: HttpResponse<ICuentaBancariaCd[]>) => res.body)
                )
                .subscribe(
                    (res: ICuentaBancariaCd[]) => (this.cuentaBancarias = res),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.cuentaBancariaService
            .query()
            .pipe(
                filter((res: HttpResponse<ICuentaBancariaCd[]>) => res.ok),
                map((res: HttpResponse<ICuentaBancariaCd[]>) => res.body)
            )
            .subscribe(
                (res: ICuentaBancariaCd[]) => {
                    this.cuentaBancarias = res;
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
        this.registerChangeInCuentaBancarias();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICuentaBancariaCd) {
        return item.id;
    }

    registerChangeInCuentaBancarias() {
        this.eventSubscriber = this.eventManager.subscribe('cuentaBancariaListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
