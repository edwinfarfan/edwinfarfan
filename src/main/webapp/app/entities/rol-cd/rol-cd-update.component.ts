import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IRolCd } from 'app/shared/model/rol-cd.model';
import { RolCdService } from './rol-cd.service';

@Component({
    selector: '-rol-cd-update',
    templateUrl: './rol-cd-update.component.html'
})
export class RolCdUpdateComponent implements OnInit {
    rol: IRolCd;
    isSaving: boolean;

    constructor(protected rolService: RolCdService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ rol }) => {
            this.rol = rol;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.rol.id !== undefined) {
            this.subscribeToSaveResponse(this.rolService.update(this.rol));
        } else {
            this.subscribeToSaveResponse(this.rolService.create(this.rol));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IRolCd>>) {
        result.subscribe((res: HttpResponse<IRolCd>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
