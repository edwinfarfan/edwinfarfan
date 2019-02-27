import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UsuarioRolCd } from 'app/shared/model/usuario-rol-cd.model';
import { UsuarioRolCdService } from './usuario-rol-cd.service';
import { UsuarioRolCdComponent } from './usuario-rol-cd.component';
import { UsuarioRolCdDetailComponent } from './usuario-rol-cd-detail.component';
import { UsuarioRolCdUpdateComponent } from './usuario-rol-cd-update.component';
import { UsuarioRolCdDeletePopupComponent } from './usuario-rol-cd-delete-dialog.component';
import { IUsuarioRolCd } from 'app/shared/model/usuario-rol-cd.model';

@Injectable({ providedIn: 'root' })
export class UsuarioRolCdResolve implements Resolve<IUsuarioRolCd> {
    constructor(private service: UsuarioRolCdService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUsuarioRolCd> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<UsuarioRolCd>) => response.ok),
                map((usuarioRol: HttpResponse<UsuarioRolCd>) => usuarioRol.body)
            );
        }
        return of(new UsuarioRolCd());
    }
}

export const usuarioRolRoute: Routes = [
    {
        path: '',
        component: UsuarioRolCdComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.usuarioRol.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: UsuarioRolCdDetailComponent,
        resolve: {
            usuarioRol: UsuarioRolCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.usuarioRol.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: UsuarioRolCdUpdateComponent,
        resolve: {
            usuarioRol: UsuarioRolCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.usuarioRol.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: UsuarioRolCdUpdateComponent,
        resolve: {
            usuarioRol: UsuarioRolCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.usuarioRol.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const usuarioRolPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: UsuarioRolCdDeletePopupComponent,
        resolve: {
            usuarioRol: UsuarioRolCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.usuarioRol.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
