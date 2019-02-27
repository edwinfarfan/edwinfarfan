import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IPersonaCd } from 'app/shared/model/persona-cd.model';
import { PersonaCdService } from './persona-cd.service';
import { ITipoDocumentoCd } from 'app/shared/model/tipo-documento-cd.model';
import { TipoDocumentoCdService } from 'app/entities/tipo-documento-cd';

@Component({
    selector: '-persona-cd-update',
    templateUrl: './persona-cd-update.component.html'
})
export class PersonaCdUpdateComponent implements OnInit {
    persona: IPersonaCd;
    isSaving: boolean;

    tipodocumentos: ITipoDocumentoCd[];
    fechaNacimientoDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected personaService: PersonaCdService,
        protected tipoDocumentoService: TipoDocumentoCdService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ persona }) => {
            this.persona = persona;
        });
        this.tipoDocumentoService
            .query({ filter: 'persona-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<ITipoDocumentoCd[]>) => mayBeOk.ok),
                map((response: HttpResponse<ITipoDocumentoCd[]>) => response.body)
            )
            .subscribe(
                (res: ITipoDocumentoCd[]) => {
                    if (!this.persona.tipoDocumento || !this.persona.tipoDocumento.id) {
                        this.tipodocumentos = res;
                    } else {
                        this.tipoDocumentoService
                            .find(this.persona.tipoDocumento.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<ITipoDocumentoCd>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<ITipoDocumentoCd>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: ITipoDocumentoCd) => (this.tipodocumentos = [subRes].concat(res)),
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
        if (this.persona.id !== undefined) {
            this.subscribeToSaveResponse(this.personaService.update(this.persona));
        } else {
            this.subscribeToSaveResponse(this.personaService.create(this.persona));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPersonaCd>>) {
        result.subscribe((res: HttpResponse<IPersonaCd>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackTipoDocumentoById(index: number, item: ITipoDocumentoCd) {
        return item.id;
    }
}
