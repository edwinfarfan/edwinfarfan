import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RolCd } from 'app/shared/model/rol-cd.model';
import { RolCdService } from './rol-cd.service';
import { RolCdComponent } from './rol-cd.component';
import { RolCdDetailComponent } from './rol-cd-detail.component';
import { RolCdUpdateComponent } from './rol-cd-update.component';
import { RolCdDeletePopupComponent } from './rol-cd-delete-dialog.component';
import { IRolCd } from 'app/shared/model/rol-cd.model';

@Injectable({ providedIn: 'root' })
export class RolCdResolve implements Resolve<IRolCd> {
    constructor(private service: RolCdService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRolCd> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<RolCd>) => response.ok),
                map((rol: HttpResponse<RolCd>) => rol.body)
            );
        }
        return of(new RolCd());
    }
}

export const rolRoute: Routes = [
    {
        path: '',
        component: RolCdComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.rol.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: RolCdDetailComponent,
        resolve: {
            rol: RolCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.rol.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: RolCdUpdateComponent,
        resolve: {
            rol: RolCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.rol.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: RolCdUpdateComponent,
        resolve: {
            rol: RolCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.rol.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const rolPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: RolCdDeletePopupComponent,
        resolve: {
            rol: RolCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.rol.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
