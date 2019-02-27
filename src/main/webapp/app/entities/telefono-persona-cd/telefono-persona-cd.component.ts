import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITelefonoPersonaCd } from 'app/shared/model/telefono-persona-cd.model';
import { AccountService } from 'app/core';
import { TelefonoPersonaCdService } from './telefono-persona-cd.service';

@Component({
    selector: '-telefono-persona-cd',
    templateUrl: './telefono-persona-cd.component.html'
})
export class TelefonoPersonaCdComponent implements OnInit, OnDestroy {
    telefonoPersonas: ITelefonoPersonaCd[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected telefonoPersonaService: TelefonoPersonaCdService,
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
            this.telefonoPersonaService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<ITelefonoPersonaCd[]>) => res.ok),
                    map((res: HttpResponse<ITelefonoPersonaCd[]>) => res.body)
                )
                .subscribe(
                    (res: ITelefonoPersonaCd[]) => (this.telefonoPersonas = res),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.telefonoPersonaService
            .query()
            .pipe(
                filter((res: HttpResponse<ITelefonoPersonaCd[]>) => res.ok),
                map((res: HttpResponse<ITelefonoPersonaCd[]>) => res.body)
            )
            .subscribe(
                (res: ITelefonoPersonaCd[]) => {
                    this.telefonoPersonas = res;
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
        this.registerChangeInTelefonoPersonas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITelefonoPersonaCd) {
        return item.id;
    }

    registerChangeInTelefonoPersonas() {
        this.eventSubscriber = this.eventManager.subscribe('telefonoPersonaListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
