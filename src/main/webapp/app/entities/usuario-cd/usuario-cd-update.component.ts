import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IUsuarioCd } from 'app/shared/model/usuario-cd.model';
import { UsuarioCdService } from './usuario-cd.service';
import { IPersonaCd } from 'app/shared/model/persona-cd.model';
import { PersonaCdService } from 'app/entities/persona-cd';

@Component({
    selector: '-usuario-cd-update',
    templateUrl: './usuario-cd-update.component.html'
})
export class UsuarioCdUpdateComponent implements OnInit {
    usuario: IUsuarioCd;
    isSaving: boolean;

    personas: IPersonaCd[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected usuarioService: UsuarioCdService,
        protected personaService: PersonaCdService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ usuario }) => {
            this.usuario = usuario;
        });
        this.personaService
            .query({ filter: 'usuario-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IPersonaCd[]>) => mayBeOk.ok),
                map((response: HttpResponse<IPersonaCd[]>) => response.body)
            )
            .subscribe(
                (res: IPersonaCd[]) => {
                    if (!this.usuario.persona || !this.usuario.persona.id) {
                        this.personas = res;
                    } else {
                        this.personaService
                            .find(this.usuario.persona.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IPersonaCd>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IPersonaCd>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IPersonaCd) => (this.personas = [subRes].concat(res)),
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
        if (this.usuario.id !== undefined) {
            this.subscribeToSaveResponse(this.usuarioService.update(this.usuario));
        } else {
            this.subscribeToSaveResponse(this.usuarioService.create(this.usuario));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IUsuarioCd>>) {
        result.subscribe((res: HttpResponse<IUsuarioCd>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
