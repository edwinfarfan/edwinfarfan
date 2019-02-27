import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IMonedaCd } from 'app/shared/model/moneda-cd.model';
import { MonedaCdService } from './moneda-cd.service';

@Component({
    selector: '-moneda-cd-update',
    templateUrl: './moneda-cd-update.component.html'
})
export class MonedaCdUpdateComponent implements OnInit {
    moneda: IMonedaCd;
    isSaving: boolean;

    constructor(protected monedaService: MonedaCdService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ moneda }) => {
            this.moneda = moneda;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.moneda.id !== undefined) {
            this.subscribeToSaveResponse(this.monedaService.update(this.moneda));
        } else {
            this.subscribeToSaveResponse(this.monedaService.create(this.moneda));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMonedaCd>>) {
        result.subscribe((res: HttpResponse<IMonedaCd>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
