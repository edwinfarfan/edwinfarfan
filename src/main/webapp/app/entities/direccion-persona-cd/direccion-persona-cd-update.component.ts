import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IDireccionPersonaCd } from 'app/shared/model/direccion-persona-cd.model';
import { DireccionPersonaCdService } from './direccion-persona-cd.service';
import { IPersonaCd } from 'app/shared/model/persona-cd.model';
import { PersonaCdService } from 'app/entities/persona-cd';

@Component({
    selector: '-direccion-persona-cd-update',
    templateUrl: './direccion-persona-cd-update.component.html'
})
export class DireccionPersonaCdUpdateComponent implements OnInit {
    direccionPersona: IDireccionPersonaCd;
    isSaving: boolean;

    personas: IPersonaCd[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected direccionPersonaService: DireccionPersonaCdService,
        protected personaService: PersonaCdService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ direccionPersona }) => {
            this.direccionPersona = direccionPersona;
        });
        this.personaService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IPersonaCd[]>) => mayBeOk.ok),
                map((response: HttpResponse<IPersonaCd[]>) => response.body)
            )
            .subscribe((res: IPersonaCd[]) => (this.personas = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.direccionPersona.id !== undefined) {
            this.subscribeToSaveResponse(this.direccionPersonaService.update(this.direccionPersona));
        } else {
            this.subscribeToSaveResponse(this.direccionPersonaService.create(this.direccionPersona));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDireccionPersonaCd>>) {
        result.subscribe((res: HttpResponse<IDireccionPersonaCd>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPersonaById(index: number, item: IPersonaCd) {
        return item.id;
    }
}
