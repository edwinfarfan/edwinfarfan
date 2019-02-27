import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITipoDocumentoCd } from 'app/shared/model/tipo-documento-cd.model';
import { AccountService } from 'app/core';
import { TipoDocumentoCdService } from './tipo-documento-cd.service';

@Component({
    selector: '-tipo-documento-cd',
    templateUrl: './tipo-documento-cd.component.html'
})
export class TipoDocumentoCdComponent implements OnInit, OnDestroy {
    tipoDocumentos: ITipoDocumentoCd[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected tipoDocumentoService: TipoDocumentoCdService,
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
            this.tipoDocumentoService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<ITipoDocumentoCd[]>) => res.ok),
                    map((res: HttpResponse<ITipoDocumentoCd[]>) => res.body)
                )
                .subscribe((res: ITipoDocumentoCd[]) => (this.tipoDocumentos = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.tipoDocumentoService
            .query()
            .pipe(
                filter((res: HttpResponse<ITipoDocumentoCd[]>) => res.ok),
                map((res: HttpResponse<ITipoDocumentoCd[]>) => res.body)
            )
            .subscribe(
                (res: ITipoDocumentoCd[]) => {
                    this.tipoDocumentos = res;
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
        this.registerChangeInTipoDocumentos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITipoDocumentoCd) {
        return item.id;
    }

    registerChangeInTipoDocumentos() {
        this.eventSubscriber = this.eventManager.subscribe('tipoDocumentoListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
