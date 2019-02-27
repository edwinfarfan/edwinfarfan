import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITipoCambioVariacionCd } from 'app/shared/model/tipo-cambio-variacion-cd.model';
import { TipoCambioVariacionCdService } from './tipo-cambio-variacion-cd.service';
import { ITipoCambioCd } from 'app/shared/model/tipo-cambio-cd.model';
import { TipoCambioCdService } from 'app/entities/tipo-cambio-cd';

@Component({
    selector: '-tipo-cambio-variacion-cd-update',
    templateUrl: './tipo-cambio-variacion-cd-update.component.html'
})
export class TipoCambioVariacionCdUpdateComponent implements OnInit {
    tipoCambioVariacion: ITipoCambioVariacionCd;
    isSaving: boolean;

    tipocambios: ITipoCambioCd[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected tipoCambioVariacionService: TipoCambioVariacionCdService,
        protected tipoCambioService: TipoCambioCdService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ tipoCambioVariacion }) => {
            this.tipoCambioVariacion = tipoCambioVariacion;
        });
        this.tipoCambioService
            .query({ filter: 'tipocambiovariacion-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<ITipoCambioCd[]>) => mayBeOk.ok),
                map((response: HttpResponse<ITipoCambioCd[]>) => response.body)
            )
            .subscribe(
                (res: ITipoCambioCd[]) => {
                    if (!this.tipoCambioVariacion.tipoCambio || !this.tipoCambioVariacion.tipoCambio.id) {
                        this.tipocambios = res;
                    } else {
                        this.tipoCambioService
                            .find(this.tipoCambioVariacion.tipoCambio.id)
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
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.tipoCambioVariacion.id !== undefined) {
            this.subscribeToSaveResponse(this.tipoCambioVariacionService.update(this.tipoCambioVariacion));
        } else {
            this.subscribeToSaveResponse(this.tipoCambioVariacionService.create(this.tipoCambioVariacion));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoCambioVariacionCd>>) {
        result.subscribe(
            (res: HttpResponse<ITipoCambioVariacionCd>) => this.onSaveSuccess(),
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

    trackTipoCambioById(index: number, item: ITipoCambioCd) {
        return item.id;
    }
}
