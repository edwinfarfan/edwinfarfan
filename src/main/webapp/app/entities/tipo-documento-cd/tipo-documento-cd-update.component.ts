import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ITipoDocumentoCd } from 'app/shared/model/tipo-documento-cd.model';
import { TipoDocumentoCdService } from './tipo-documento-cd.service';

@Component({
    selector: '-tipo-documento-cd-update',
    templateUrl: './tipo-documento-cd-update.component.html'
})
export class TipoDocumentoCdUpdateComponent implements OnInit {
    tipoDocumento: ITipoDocumentoCd;
    isSaving: boolean;

    constructor(protected tipoDocumentoService: TipoDocumentoCdService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ tipoDocumento }) => {
            this.tipoDocumento = tipoDocumento;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.tipoDocumento.id !== undefined) {
            this.subscribeToSaveResponse(this.tipoDocumentoService.update(this.tipoDocumento));
        } else {
            this.subscribeToSaveResponse(this.tipoDocumentoService.create(this.tipoDocumento));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoDocumentoCd>>) {
        result.subscribe((res: HttpResponse<ITipoDocumentoCd>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
