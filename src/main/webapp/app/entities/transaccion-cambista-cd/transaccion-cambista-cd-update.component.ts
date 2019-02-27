import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { ITransaccionCambistaCd } from 'app/shared/model/transaccion-cambista-cd.model';
import { TransaccionCambistaCdService } from './transaccion-cambista-cd.service';
import { ITransaccionPersonaCd } from 'app/shared/model/transaccion-persona-cd.model';
import { TransaccionPersonaCdService } from 'app/entities/transaccion-persona-cd';
import { IDepositoCambistaCd } from 'app/shared/model/deposito-cambista-cd.model';
import { DepositoCambistaCdService } from 'app/entities/deposito-cambista-cd';

@Component({
    selector: '-transaccion-cambista-cd-update',
    templateUrl: './transaccion-cambista-cd-update.component.html'
})
export class TransaccionCambistaCdUpdateComponent implements OnInit {
    transaccionCambista: ITransaccionCambistaCd;
    isSaving: boolean;

    transaccionpersonas: ITransaccionPersonaCd[];

    iddepositocambistas: IDepositoCambistaCd[];
    fechaDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected transaccionCambistaService: TransaccionCambistaCdService,
        protected transaccionPersonaService: TransaccionPersonaCdService,
        protected depositoCambistaService: DepositoCambistaCdService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ transaccionCambista }) => {
            this.transaccionCambista = transaccionCambista;
        });
        this.transaccionPersonaService
            .query({ filter: 'transaccioncambista-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<ITransaccionPersonaCd[]>) => mayBeOk.ok),
                map((response: HttpResponse<ITransaccionPersonaCd[]>) => response.body)
            )
            .subscribe(
                (res: ITransaccionPersonaCd[]) => {
                    if (!this.transaccionCambista.transaccionPersona || !this.transaccionCambista.transaccionPersona.id) {
                        this.transaccionpersonas = res;
                    } else {
                        this.transaccionPersonaService
                            .find(this.transaccionCambista.transaccionPersona.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<ITransaccionPersonaCd>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<ITransaccionPersonaCd>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: ITransaccionPersonaCd) => (this.transaccionpersonas = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.depositoCambistaService
            .query({ filter: 'transaccioncambista-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IDepositoCambistaCd[]>) => mayBeOk.ok),
                map((response: HttpResponse<IDepositoCambistaCd[]>) => response.body)
            )
            .subscribe(
                (res: IDepositoCambistaCd[]) => {
                    if (!this.transaccionCambista.idDepositoCambista || !this.transaccionCambista.idDepositoCambista.id) {
                        this.iddepositocambistas = res;
                    } else {
                        this.depositoCambistaService
                            .find(this.transaccionCambista.idDepositoCambista.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IDepositoCambistaCd>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IDepositoCambistaCd>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IDepositoCambistaCd) => (this.iddepositocambistas = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.transaccionCambista.id !== undefined) {
            this.subscribeToSaveResponse(this.transaccionCambistaService.update(this.transaccionCambista));
        } else {
            this.subscribeToSaveResponse(this.transaccionCambistaService.create(this.transaccionCambista));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITransaccionCambistaCd>>) {
        result.subscribe(
            (res: HttpResponse<ITransaccionCambistaCd>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
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

    trackTransaccionPersonaById(index: number, item: ITransaccionPersonaCd) {
        return item.id;
    }

    trackDepositoCambistaById(index: number, item: IDepositoCambistaCd) {
        return item.id;
    }
}
