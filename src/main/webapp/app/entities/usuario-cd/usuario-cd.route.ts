import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UsuarioCd } from 'app/shared/model/usuario-cd.model';
import { UsuarioCdService } from './usuario-cd.service';
import { UsuarioCdComponent } from './usuario-cd.component';
import { UsuarioCdDetailComponent } from './usuario-cd-detail.component';
import { UsuarioCdUpdateComponent } from './usuario-cd-update.component';
import { UsuarioCdDeletePopupComponent } from './usuario-cd-delete-dialog.component';
import { IUsuarioCd } from 'app/shared/model/usuario-cd.model';

@Injectable({ providedIn: 'root' })
export class UsuarioCdResolve implements Resolve<IUsuarioCd> {
    constructor(private service: UsuarioCdService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUsuarioCd> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<UsuarioCd>) => response.ok),
                map((usuario: HttpResponse<UsuarioCd>) => usuario.body)
            );
        }
        return of(new UsuarioCd());
    }
}

export const usuarioRoute: Routes = [
    {
        path: '',
        component: UsuarioCdComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.usuario.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: UsuarioCdDetailComponent,
        resolve: {
            usuario: UsuarioCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.usuario.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: UsuarioCdUpdateComponent,
        resolve: {
            usuario: UsuarioCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.usuario.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: UsuarioCdUpdateComponent,
        resolve: {
            usuario: UsuarioCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.usuario.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const usuarioPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: UsuarioCdDeletePopupComponent,
        resolve: {
            usuario: UsuarioCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.usuario.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
