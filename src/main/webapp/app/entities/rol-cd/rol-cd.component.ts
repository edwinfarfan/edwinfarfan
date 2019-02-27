import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRolCd } from 'app/shared/model/rol-cd.model';
import { AccountService } from 'app/core';
import { RolCdService } from './rol-cd.service';

@Component({
    selector: '-rol-cd',
    templateUrl: './rol-cd.component.html'
})
export class RolCdComponent implements OnInit, OnDestroy {
    rols: IRolCd[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected rolService: RolCdService,
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
            this.rolService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IRolCd[]>) => res.ok),
                    map((res: HttpResponse<IRolCd[]>) => res.body)
                )
                .subscribe((res: IRolCd[]) => (this.rols = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.rolService
            .query()
            .pipe(
                filter((res: HttpResponse<IRolCd[]>) => res.ok),
                map((res: HttpResponse<IRolCd[]>) => res.body)
            )
            .subscribe(
                (res: IRolCd[]) => {
                    this.rols = res;
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
        this.registerChangeInRols();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRolCd) {
        return item.id;
    }

    registerChangeInRols() {
        this.eventSubscriber = this.eventManager.subscribe('rolListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
