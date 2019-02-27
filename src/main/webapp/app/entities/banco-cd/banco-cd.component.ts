import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBancoCd } from 'app/shared/model/banco-cd.model';
import { AccountService } from 'app/core';
import { BancoCdService } from './banco-cd.service';

@Component({
    selector: '-banco-cd',
    templateUrl: './banco-cd.component.html'
})
export class BancoCdComponent implements OnInit, OnDestroy {
    bancos: IBancoCd[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected bancoService: BancoCdService,
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
            this.bancoService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IBancoCd[]>) => res.ok),
                    map((res: HttpResponse<IBancoCd[]>) => res.body)
                )
                .subscribe((res: IBancoCd[]) => (this.bancos = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.bancoService
            .query()
            .pipe(
                filter((res: HttpResponse<IBancoCd[]>) => res.ok),
                map((res: HttpResponse<IBancoCd[]>) => res.body)
            )
            .subscribe(
                (res: IBancoCd[]) => {
                    this.bancos = res;
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
        this.registerChangeInBancos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IBancoCd) {
        return item.id;
    }

    registerChangeInBancos() {
        this.eventSubscriber = this.eventManager.subscribe('bancoListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
