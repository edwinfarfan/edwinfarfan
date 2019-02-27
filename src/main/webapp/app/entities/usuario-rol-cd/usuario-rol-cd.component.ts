import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IUsuarioRolCd } from 'app/shared/model/usuario-rol-cd.model';
import { AccountService } from 'app/core';
import { UsuarioRolCdService } from './usuario-rol-cd.service';

@Component({
    selector: '-usuario-rol-cd',
    templateUrl: './usuario-rol-cd.component.html'
})
export class UsuarioRolCdComponent implements OnInit, OnDestroy {
    usuarioRols: IUsuarioRolCd[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected usuarioRolService: UsuarioRolCdService,
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
            this.usuarioRolService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IUsuarioRolCd[]>) => res.ok),
                    map((res: HttpResponse<IUsuarioRolCd[]>) => res.body)
                )
                .subscribe((res: IUsuarioRolCd[]) => (this.usuarioRols = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.usuarioRolService
            .query()
            .pipe(
                filter((res: HttpResponse<IUsuarioRolCd[]>) => res.ok),
                map((res: HttpResponse<IUsuarioRolCd[]>) => res.body)
            )
            .subscribe(
                (res: IUsuarioRolCd[]) => {
                    this.usuarioRols = res;
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
        this.registerChangeInUsuarioRols();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IUsuarioRolCd) {
        return item.id;
    }

    registerChangeInUsuarioRols() {
        this.eventSubscriber = this.eventManager.subscribe('usuarioRolListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
