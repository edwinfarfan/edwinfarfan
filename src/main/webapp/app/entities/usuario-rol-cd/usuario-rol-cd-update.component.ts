import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IUsuarioRolCd } from 'app/shared/model/usuario-rol-cd.model';
import { UsuarioRolCdService } from './usuario-rol-cd.service';
import { IUsuarioCd } from 'app/shared/model/usuario-cd.model';
import { UsuarioCdService } from 'app/entities/usuario-cd';
import { IRolCd } from 'app/shared/model/rol-cd.model';
import { RolCdService } from 'app/entities/rol-cd';
import { IPermisoCd } from 'app/shared/model/permiso-cd.model';
import { PermisoCdService } from 'app/entities/permiso-cd';

@Component({
    selector: '-usuario-rol-cd-update',
    templateUrl: './usuario-rol-cd-update.component.html'
})
export class UsuarioRolCdUpdateComponent implements OnInit {
    usuarioRol: IUsuarioRolCd;
    isSaving: boolean;

    usuarios: IUsuarioCd[];

    rols: IRolCd[];

    permisos: IPermisoCd[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected usuarioRolService: UsuarioRolCdService,
        protected usuarioService: UsuarioCdService,
        protected rolService: RolCdService,
        protected permisoService: PermisoCdService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ usuarioRol }) => {
            this.usuarioRol = usuarioRol;
        });
        this.usuarioService
            .query({ filter: 'usuariorol-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IUsuarioCd[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUsuarioCd[]>) => response.body)
            )
            .subscribe(
                (res: IUsuarioCd[]) => {
                    if (!this.usuarioRol.usuario || !this.usuarioRol.usuario.id) {
                        this.usuarios = res;
                    } else {
                        this.usuarioService
                            .find(this.usuarioRol.usuario.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IUsuarioCd>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IUsuarioCd>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IUsuarioCd) => (this.usuarios = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.rolService
            .query({ filter: 'usuariorol-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IRolCd[]>) => mayBeOk.ok),
                map((response: HttpResponse<IRolCd[]>) => response.body)
            )
            .subscribe(
                (res: IRolCd[]) => {
                    if (!this.usuarioRol.rol || !this.usuarioRol.rol.id) {
                        this.rols = res;
                    } else {
                        this.rolService
                            .find(this.usuarioRol.rol.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IRolCd>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IRolCd>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IRolCd) => (this.rols = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.permisoService
            .query({ filter: 'usuariorol-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IPermisoCd[]>) => mayBeOk.ok),
                map((response: HttpResponse<IPermisoCd[]>) => response.body)
            )
            .subscribe(
                (res: IPermisoCd[]) => {
                    if (!this.usuarioRol.permiso || !this.usuarioRol.permiso.id) {
                        this.permisos = res;
                    } else {
                        this.permisoService
                            .find(this.usuarioRol.permiso.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IPermisoCd>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IPermisoCd>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IPermisoCd) => (this.permisos = [subRes].concat(res)),
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
        if (this.usuarioRol.id !== undefined) {
            this.subscribeToSaveResponse(this.usuarioRolService.update(this.usuarioRol));
        } else {
            this.subscribeToSaveResponse(this.usuarioRolService.create(this.usuarioRol));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IUsuarioRolCd>>) {
        result.subscribe((res: HttpResponse<IUsuarioRolCd>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUsuarioById(index: number, item: IUsuarioCd) {
        return item.id;
    }

    trackRolById(index: number, item: IRolCd) {
        return item.id;
    }

    trackPermisoById(index: number, item: IPermisoCd) {
        return item.id;
    }
}
