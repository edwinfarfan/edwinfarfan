import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { ITransaccionPersonaCd } from 'app/shared/model/transaccion-persona-cd.model';
import { TransaccionPersonaCdService } from './transaccion-persona-cd.service';
import { IUsuarioCd } from 'app/shared/model/usuario-cd.model';
import { UsuarioCdService } from 'app/entities/usuario-cd';
import { IBancoCd } from 'app/shared/model/banco-cd.model';
import { BancoCdService } from 'app/entities/banco-cd';
import { IMonedaCd } from 'app/shared/model/moneda-cd.model';
import { MonedaCdService } from 'app/entities/moneda-cd';
import { ITipoCambioCd } from 'app/shared/model/tipo-cambio-cd.model';
import { TipoCambioCdService } from 'app/entities/tipo-cambio-cd';
import { IDepositoPersonaCd } from 'app/shared/model/deposito-persona-cd.model';
import { DepositoPersonaCdService } from 'app/entities/deposito-persona-cd';
import { ICuentaBancariaCd } from 'app/shared/model/cuenta-bancaria-cd.model';
import { CuentaBancariaCdService } from 'app/entities/cuenta-bancaria-cd';
import { IDepositoCambistaCd } from 'app/shared/model/deposito-cambista-cd.model';
import { DepositoCambistaCdService } from 'app/entities/deposito-cambista-cd';

@Component({
    selector: '-transaccion-persona-cd-update',
    templateUrl: './transaccion-persona-cd-update.component.html'
})
export class TransaccionPersonaCdUpdateComponent implements OnInit {
    transaccionPersona: ITransaccionPersonaCd;
    isSaving: boolean;

    usuarios: IUsuarioCd[];

    bancoorigens: IBancoCd[];

    bancodestinos: IBancoCd[];

    monedaacomprars: IMonedaCd[];

    tipocambios: ITipoCambioCd[];

    depositopersonas: IDepositoPersonaCd[];

    cuentadestinopersonas: ICuentaBancariaCd[];

    monedamontototals: IMonedaCd[];

    depositocambistas: IDepositoCambistaCd[];
    fechaDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected transaccionPersonaService: TransaccionPersonaCdService,
        protected usuarioService: UsuarioCdService,
        protected bancoService: BancoCdService,
        protected monedaService: MonedaCdService,
        protected tipoCambioService: TipoCambioCdService,
        protected depositoPersonaService: DepositoPersonaCdService,
        protected cuentaBancariaService: CuentaBancariaCdService,
        protected depositoCambistaService: DepositoCambistaCdService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ transaccionPersona }) => {
            this.transaccionPersona = transaccionPersona;
        });
        this.usuarioService
            .query({ filter: 'transaccionpersona-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IUsuarioCd[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUsuarioCd[]>) => response.body)
            )
            .subscribe(
                (res: IUsuarioCd[]) => {
                    if (!this.transaccionPersona.usuario || !this.transaccionPersona.usuario.id) {
                        this.usuarios = res;
                    } else {
                        this.usuarioService
                            .find(this.transaccionPersona.usuario.id)
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
            .query({ filter: 'transaccionpersona-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IBancoCd[]>) => mayBeOk.ok),
                map((response: HttpResponse<IBancoCd[]>) => response.body)
            )
            .subscribe(
                (res: IBancoCd[]) => {
                    if (!this.transaccionPersona.bancoOrigen || !this.transaccionPersona.bancoOrigen.id) {
                        this.bancoorigens = res;
                    } else {
                        this.bancoService
                            .find(this.transaccionPersona.bancoOrigen.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IBancoCd>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IBancoCd>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IBancoCd) => (this.bancoorigens = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.bancoService
            .query({ filter: 'transaccionpersona-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IBancoCd[]>) => mayBeOk.ok),
                map((response: HttpResponse<IBancoCd[]>) => response.body)
            )
            .subscribe(
                (res: IBancoCd[]) => {
                    if (!this.transaccionPersona.bancoDestino || !this.transaccionPersona.bancoDestino.id) {
                        this.bancodestinos = res;
                    } else {
                        this.bancoService
                            .find(this.transaccionPersona.bancoDestino.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IBancoCd>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IBancoCd>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IBancoCd) => (this.bancodestinos = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.monedaService
            .query({ filter: 'transaccionpersona-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IMonedaCd[]>) => mayBeOk.ok),
                map((response: HttpResponse<IMonedaCd[]>) => response.body)
            )
            .subscribe(
                (res: IMonedaCd[]) => {
                    if (!this.transaccionPersona.monedaAComprar || !this.transaccionPersona.monedaAComprar.id) {
                        this.monedaacomprars = res;
                    } else {
                        this.monedaService
                            .find(this.transaccionPersona.monedaAComprar.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IMonedaCd>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IMonedaCd>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IMonedaCd) => (this.monedaacomprars = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.tipoCambioService
            .query({ filter: 'transaccionpersona-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<ITipoCambioCd[]>) => mayBeOk.ok),
                map((response: HttpResponse<ITipoCambioCd[]>) => response.body)
            )
            .subscribe(
                (res: ITipoCambioCd[]) => {
                    if (!this.transaccionPersona.tipoCambio || !this.transaccionPersona.tipoCambio.id) {
                        this.tipocambios = res;
                    } else {
                        this.tipoCambioService
                            .find(this.transaccionPersona.tipoCambio.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<ITipoCambioCd>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<ITipoCambioCd>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: ITipoCambioCd) => (this.tipocambios = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.depositoPersonaService
            .query({ filter: 'transaccionpersona-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IDepositoPersonaCd[]>) => mayBeOk.ok),
                map((response: HttpResponse<IDepositoPersonaCd[]>) => response.body)
            )
            .subscribe(
                (res: IDepositoPersonaCd[]) => {
                    if (!this.transaccionPersona.depositoPersona || !this.transaccionPersona.depositoPersona.id) {
                        this.depositopersonas = res;
                    } else {
                        this.depositoPersonaService
                            .find(this.transaccionPersona.depositoPersona.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IDepositoPersonaCd>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IDepositoPersonaCd>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IDepositoPersonaCd) => (this.depositopersonas = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.cuentaBancariaService
            .query({ filter: 'transaccionpersona-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<ICuentaBancariaCd[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICuentaBancariaCd[]>) => response.body)
            )
            .subscribe(
                (res: ICuentaBancariaCd[]) => {
                    if (!this.transaccionPersona.cuentaDestinoPersona || !this.transaccionPersona.cuentaDestinoPersona.id) {
                        this.cuentadestinopersonas = res;
                    } else {
                        this.cuentaBancariaService
                            .find(this.transaccionPersona.cuentaDestinoPersona.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<ICuentaBancariaCd>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<ICuentaBancariaCd>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: ICuentaBancariaCd) => (this.cuentadestinopersonas = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.monedaService
            .query({ filter: 'transaccionpersona-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IMonedaCd[]>) => mayBeOk.ok),
                map((response: HttpResponse<IMonedaCd[]>) => response.body)
            )
            .subscribe(
                (res: IMonedaCd[]) => {
                    if (!this.transaccionPersona.monedaMontoTotal || !this.transaccionPersona.monedaMontoTotal.id) {
                        this.monedamontototals = res;
                    } else {
                        this.monedaService
                            .find(this.transaccionPersona.monedaMontoTotal.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IMonedaCd>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IMonedaCd>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IMonedaCd) => (this.monedamontototals = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.depositoCambistaService
            .query({ filter: 'transaccionpersona-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IDepositoCambistaCd[]>) => mayBeOk.ok),
                map((response: HttpResponse<IDepositoCambistaCd[]>) => response.body)
            )
            .subscribe(
                (res: IDepositoCambistaCd[]) => {
                    if (!this.transaccionPersona.depositoCambista || !this.transaccionPersona.depositoCambista.id) {
                        this.depositocambistas = res;
                    } else {
                        this.depositoCambistaService
                            .find(this.transaccionPersona.depositoCambista.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IDepositoCambistaCd>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IDepositoCambistaCd>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IDepositoCambistaCd) => (this.depositocambistas = [subRes].concat(res)),
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
        if (this.transaccionPersona.id !== undefined) {
            this.subscribeToSaveResponse(this.transaccionPersonaService.update(this.transaccionPersona));
        } else {
            this.subscribeToSaveResponse(this.transaccionPersonaService.create(this.transaccionPersona));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITransaccionPersonaCd>>) {
        result.subscribe(
            (res: HttpResponse<ITransaccionPersonaCd>) => this.onSaveSuccess(),
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

    trackUsuarioById(index: number, item: IUsuarioCd) {
        return item.id;
    }

    trackBancoById(index: number, item: IBancoCd) {
        return item.id;
    }

    trackMonedaById(index: number, item: IMonedaCd) {
        return item.id;
    }

    trackTipoCambioById(index: number, item: ITipoCambioCd) {
        return item.id;
    }

    trackDepositoPersonaById(index: number, item: IDepositoPersonaCd) {
        return item.id;
    }

    trackCuentaBancariaById(index: number, item: ICuentaBancariaCd) {
        return item.id;
    }

    trackDepositoCambistaById(index: number, item: IDepositoCambistaCd) {
        return item.id;
    }
}
