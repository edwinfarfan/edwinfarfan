import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { ITipoCambioCd } from 'app/shared/model/tipo-cambio-cd.model';
import { TipoCambioCdService } from './tipo-cambio-cd.service';
import { IMonedaCd } from 'app/shared/model/moneda-cd.model';
import { MonedaCdService } from 'app/entities/moneda-cd';

@Component({
    selector: '-tipo-cambio-cd-update',
    templateUrl: './tipo-cambio-cd-update.component.html'
})
export class TipoCambioCdUpdateComponent implements OnInit {
    tipoCambio: ITipoCambioCd;
    isSaving: boolean;

    monedas: IMonedaCd[];
    fechaDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected tipoCambioService: TipoCambioCdService,
        protected monedaService: MonedaCdService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ tipoCambio }) => {
            this.tipoCambio = tipoCambio;
        });
        this.monedaService
            .query({ filter: 'tipocambio-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IMonedaCd[]>) => mayBeOk.ok),
                map((response: HttpResponse<IMonedaCd[]>) => response.body)
            )
            .subscribe(
                (res: IMonedaCd[]) => {
                    if (!this.tipoCambio.moneda || !this.tipoCambio.moneda.id) {
                        this.monedas = res;
                    } else {
                        this.monedaService
                            .find(this.tipoCambio.moneda.id)
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

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.tipoCambio.id !== undefined) {
            this.subscribeToSaveResponse(this.tipoCambioService.update(this.tipoCambio));
        } else {
            this.subscribeToSaveResponse(this.tipoCambioService.create(this.tipoCambio));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoCambioCd>>) {
        result.subscribe((res: HttpResponse<ITipoCambioCd>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackMonedaById(index: number, item: IMonedaCd) {
        return item.id;
    }
}
