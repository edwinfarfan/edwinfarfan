import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICuentaBancariaCd } from 'app/shared/model/cuenta-bancaria-cd.model';
import { CuentaBancariaCdService } from './cuenta-bancaria-cd.service';
import { IBancoCd } from 'app/shared/model/banco-cd.model';
import { BancoCdService } from 'app/entities/banco-cd';
import { IUsuarioCd } from 'app/shared/model/usuario-cd.model';
import { UsuarioCdService } from 'app/entities/usuario-cd';

@Component({
    selector: '-cuenta-bancaria-cd-update',
    templateUrl: './cuenta-bancaria-cd-update.component.html'
})
export class CuentaBancariaCdUpdateComponent implements OnInit {
    cuentaBancaria: ICuentaBancariaCd;
    isSaving: boolean;

    bancos: IBancoCd[];

    usuarios: IUsuarioCd[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected cuentaBancariaService: CuentaBancariaCdService,
        protected bancoService: BancoCdService,
        protected usuarioService: UsuarioCdService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ cuentaBancaria }) => {
            this.cuentaBancaria = cuentaBancaria;
        });
        this.bancoService
            .query({ filter: 'cuentabancaria-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IBancoCd[]>) => mayBeOk.ok),
                map((response: HttpResponse<IBancoCd[]>) => response.body)
            )
            .subscribe(
                (res: IBancoCd[]) => {
                    if (!this.cuentaBancaria.banco || !this.cuentaBancaria.banco.id) {
                        this.bancos = res;
                    } else {
                        this.bancoService
                            .find(this.cuentaBancaria.banco.id)
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
        this.usuarioService
            .query({ filter: 'cuentabancaria-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IUsuarioCd[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUsuarioCd[]>) => response.body)
            )
            .subscribe(
                (res: IUsuarioCd[]) => {
                    if (!this.cuentaBancaria.usuario || !this.cuentaBancaria.usuario.id) {
                        this.usuarios = res;
                    } else {
                        this.usuarioService
                            .find(this.cuentaBancaria.usuario.id)
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
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.cuentaBancaria.id !== undefined) {
            this.subscribeToSaveResponse(this.cuentaBancariaService.update(this.cuentaBancaria));
        } else {
            this.subscribeToSaveResponse(this.cuentaBancariaService.create(this.cuentaBancaria));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICuentaBancariaCd>>) {
        result.subscribe((res: HttpResponse<ICuentaBancariaCd>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackBancoById(index: number, item: IBancoCd) {
        return item.id;
    }

    trackUsuarioById(index: number, item: IUsuarioCd) {
        return item.id;
    }
}
