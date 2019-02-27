import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDireccionPersonaCd } from 'app/shared/model/direccion-persona-cd.model';
import { AccountService } from 'app/core';
import { DireccionPersonaCdService } from './direccion-persona-cd.service';

@Component({
    selector: '-direccion-persona-cd',
    templateUrl: './direccion-persona-cd.component.html'
})
export class DireccionPersonaCdComponent implements OnInit, OnDestroy {
    direccionPersonas: IDireccionPersonaCd[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected direccionPersonaService: DireccionPersonaCdService,
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
            this.direccionPersonaService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IDireccionPersonaCd[]>) => res.ok),
                    map((res: HttpResponse<IDireccionPersonaCd[]>) => res.body)
                )
                .subscribe(
                    (res: IDireccionPersonaCd[]) => (this.direccionPersonas = res),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.direccionPersonaService
            .query()
            .pipe(
                filter((res: HttpResponse<IDireccionPersonaCd[]>) => res.ok),
                map((res: HttpResponse<IDireccionPersonaCd[]>) => res.body)
            )
            .subscribe(
                (res: IDireccionPersonaCd[]) => {
                    this.direccionPersonas = res;
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
        this.registerChangeInDireccionPersonas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDireccionPersonaCd) {
        return item.id;
    }

    registerChangeInDireccionPersonas() {
        this.eventSubscriber = this.eventManager.subscribe('direccionPersonaListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
