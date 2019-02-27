import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IDepositoCambistaCd } from 'app/shared/model/deposito-cambista-cd.model';
import { DepositoCambistaCdService } from './deposito-cambista-cd.service';
import { IUsuarioCd } from 'app/shared/model/usuario-cd.model';
import { UsuarioCdService } from 'app/entities/usuario-cd';
import { IBancoCd } from 'app/shared/model/banco-cd.model';
import { BancoCdService } from 'app/entities/banco-cd';
import { IMonedaCd } from 'app/shared/model/moneda-cd.model';
import { MonedaCdService } from 'app/entities/moneda-cd';

@Component({
    selector: '-deposito-cambista-cd-update',
    templateUrl: './deposito-cambista-cd-update.component.html'
})
export class DepositoCambistaCdUpdateComponent implements OnInit {
    depositoCambista: IDepositoCambistaCd;
    isSaving: boolean;

    usuarios: IUsuarioCd[];

    bancos: IBancoCd[];

    monedas: IMonedaCd[];
    fechaDp: any;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected depositoCambistaService: DepositoCambistaCdService,
        protected usuarioService: UsuarioCdService,
        protected bancoService: BancoCdService,
        protected monedaService: MonedaCdService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ depositoCambista }) => {
            this.depositoCambista = depositoCambista;
        });
        this.usuarioService
            .query({ filter: 'depositocambista-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IUsuarioCd[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUsuarioCd[]>) => response.body)
            )
            .subscribe(
                (res: IUsuarioCd[]) => {
                    if (!this.depositoCambista.usuario || !this.depositoCambista.usuario.id) {
                        this.usuarios = res;
                    } else {
                        this.usuarioService
                            .find(this.depositoCambista.usuario.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IUsuarioCd>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IUsuarioCd>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IUsuarioCd) => (this.usuarios = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.bancoService
            .query({ filter: 'depositocambista-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IBancoCd[]>) => mayBeOk.ok),
                map((response: HttpResponse<IBancoCd[]>) => response.body)
            )
            .subscribe(
                (res: IBancoCd[]) => {
                    if (!this.depositoCambista.banco || !this.depositoCambista.banco.id) {
                        this.bancos = res;
                    } else {
                        this.bancoService
                            .find(this.depositoCambista.banco.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IBancoCd>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IBancoCd>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IBancoCd) => (this.bancos = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.monedaService
            .query({ filter: 'depositocambista-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IMonedaCd[]>) => mayBeOk.ok),
                map((response: HttpResponse<IMonedaCd[]>) => response.body)
            )
            .subscribe(
                (res: IMonedaCd[]) => {
                    if (!this.depositoCambista.moneda || !this.depositoCambista.moneda.id) {
                        this.monedas = res;
                    } else {
                        this.monedaService
                            .find(this.depositoCambista.moneda.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IMonedaCd>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IMonedaCd>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IMonedaCd) => (this.monedas = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.depositoCambista.id !== undefined) {
            this.subscribeToSaveResponse(this.depositoCambistaService.update(this.depositoCambista));
        } else {
            this.subscribeToSaveResponse(this.depositoCambistaService.create(this.depositoCambista));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDepositoCambistaCd>>) {
        result.subscribe((res: HttpResponse<IDepositoCambistaCd>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackUsuarioById(index: number, item: IUsuarioCd) {
        return item.id;
    }

    trackBancoById(index: number, item: IBancoCd) {
        return item.id;
    }

    trackMonedaById(index: number, item: IMonedaCd) {
        return item.id;
    }
}
