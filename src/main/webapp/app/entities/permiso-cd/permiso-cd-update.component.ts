import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IPermisoCd } from 'app/shared/model/permiso-cd.model';
import { PermisoCdService } from './permiso-cd.service';

@Component({
    selector: '-permiso-cd-update',
    templateUrl: './permiso-cd-update.component.html'
})
export class PermisoCdUpdateComponent implements OnInit {
    permiso: IPermisoCd;
    isSaving: boolean;

    constructor(protected permisoService: PermisoCdService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ permiso }) => {
            this.permiso = permiso;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.permiso.id !== undefined) {
            this.subscribeToSaveResponse(this.permisoService.update(this.permiso));
        } else {
            this.subscribeToSaveResponse(this.permisoService.create(this.permiso));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPermisoCd>>) {
        result.subscribe((res: HttpResponse<IPermisoCd>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
