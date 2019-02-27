import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITelefonoPersonaCd } from 'app/shared/model/telefono-persona-cd.model';
import { TelefonoPersonaCdService } from './telefono-persona-cd.service';
import { IPersonaCd } from 'app/shared/model/persona-cd.model';
import { PersonaCdService } from 'app/entities/persona-cd';

@Component({
    selector: '-telefono-persona-cd-update',
    templateUrl: './telefono-persona-cd-update.component.html'
})
export class TelefonoPersonaCdUpdateComponent implements OnInit {
    telefonoPersona: ITelefonoPersonaCd;
    isSaving: boolean;

    personas: IPersonaCd[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected telefonoPersonaService: TelefonoPersonaCdService,
        protected personaService: PersonaCdService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ telefonoPersona }) => {
            this.telefonoPersona = telefonoPersona;
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
        if (this.telefonoPersona.id !== undefined) {
            this.subscribeToSaveResponse(this.telefonoPersonaService.update(this.telefonoPersona));
        } else {
            this.subscribeToSaveResponse(this.telefonoPersonaService.create(this.telefonoPersona));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITelefonoPersonaCd>>) {
        result.subscribe((res: HttpResponse<ITelefonoPersonaCd>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
