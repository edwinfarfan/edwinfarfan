import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IUsuarioCd } from 'app/shared/model/usuario-cd.model';
import { AccountService } from 'app/core';
import { UsuarioCdService } from './usuario-cd.service';

@Component({
    selector: '-usuario-cd',
    templateUrl: './usuario-cd.component.html'
})
export class UsuarioCdComponent implements OnInit, OnDestroy {
    usuarios: IUsuarioCd[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected usuarioService: UsuarioCdService,
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
            this.usuarioService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IUsuarioCd[]>) => res.ok),
                    map((res: HttpResponse<IUsuarioCd[]>) => res.body)
                )
                .subscribe((res: IUsuarioCd[]) => (this.usuarios = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.usuarioService
            .query()
            .pipe(
                filter((res: HttpResponse<IUsuarioCd[]>) => res.ok),
                map((res: HttpResponse<IUsuarioCd[]>) => res.body)
            )
            .subscribe(
                (res: IUsuarioCd[]) => {
                    this.usuarios = res;
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
        this.registerChangeInUsuarios();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IUsuarioCd) {
        return item.id;
    }

    registerChangeInUsuarios() {
        this.eventSubscriber = this.eventManager.subscribe('usuarioListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
