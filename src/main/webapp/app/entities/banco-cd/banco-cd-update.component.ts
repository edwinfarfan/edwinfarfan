import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IBancoCd } from 'app/shared/model/banco-cd.model';
import { BancoCdService } from './banco-cd.service';

@Component({
    selector: '-banco-cd-update',
    templateUrl: './banco-cd-update.component.html'
})
export class BancoCdUpdateComponent implements OnInit {
    banco: IBancoCd;
    isSaving: boolean;

    constructor(protected bancoService: BancoCdService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ banco }) => {
            this.banco = banco;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.banco.id !== undefined) {
            this.subscribeToSaveResponse(this.bancoService.update(this.banco));
        } else {
            this.subscribeToSaveResponse(this.bancoService.create(this.banco));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IBancoCd>>) {
        result.subscribe((res: HttpResponse<IBancoCd>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
