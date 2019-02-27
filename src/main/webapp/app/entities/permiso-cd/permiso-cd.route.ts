import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PermisoCd } from 'app/shared/model/permiso-cd.model';
import { PermisoCdService } from './permiso-cd.service';
import { PermisoCdComponent } from './permiso-cd.component';
import { PermisoCdDetailComponent } from './permiso-cd-detail.component';
import { PermisoCdUpdateComponent } from './permiso-cd-update.component';
import { PermisoCdDeletePopupComponent } from './permiso-cd-delete-dialog.component';
import { IPermisoCd } from 'app/shared/model/permiso-cd.model';

@Injectable({ providedIn: 'root' })
export class PermisoCdResolve implements Resolve<IPermisoCd> {
    constructor(private service: PermisoCdService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPermisoCd> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PermisoCd>) => response.ok),
                map((permiso: HttpResponse<PermisoCd>) => permiso.body)
            );
        }
        return of(new PermisoCd());
    }
}

export const permisoRoute: Routes = [
    {
        path: '',
        component: PermisoCdComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.permiso.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: PermisoCdDetailComponent,
        resolve: {
            permiso: PermisoCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.permiso.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: PermisoCdUpdateComponent,
        resolve: {
            permiso: PermisoCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.permiso.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: PermisoCdUpdateComponent,
        resolve: {
            permiso: PermisoCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.permiso.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const permisoPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: PermisoCdDeletePopupComponent,
        resolve: {
            permiso: PermisoCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.permiso.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
