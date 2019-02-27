import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DepositoPersonaCd } from 'app/shared/model/deposito-persona-cd.model';
import { DepositoPersonaCdService } from './deposito-persona-cd.service';
import { DepositoPersonaCdComponent } from './deposito-persona-cd.component';
import { DepositoPersonaCdDetailComponent } from './deposito-persona-cd-detail.component';
import { DepositoPersonaCdUpdateComponent } from './deposito-persona-cd-update.component';
import { DepositoPersonaCdDeletePopupComponent } from './deposito-persona-cd-delete-dialog.component';
import { IDepositoPersonaCd } from 'app/shared/model/deposito-persona-cd.model';

@Injectable({ providedIn: 'root' })
export class DepositoPersonaCdResolve implements Resolve<IDepositoPersonaCd> {
    constructor(private service: DepositoPersonaCdService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDepositoPersonaCd> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<DepositoPersonaCd>) => response.ok),
                map((depositoPersona: HttpResponse<DepositoPersonaCd>) => depositoPersona.body)
            );
        }
        return of(new DepositoPersonaCd());
    }
}

export const depositoPersonaRoute: Routes = [
    {
        path: '',
        component: DepositoPersonaCdComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.depositoPersona.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: DepositoPersonaCdDetailComponent,
        resolve: {
            depositoPersona: DepositoPersonaCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.depositoPersona.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: DepositoPersonaCdUpdateComponent,
        resolve: {
            depositoPersona: DepositoPersonaCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.depositoPersona.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: DepositoPersonaCdUpdateComponent,
        resolve: {
            depositoPersona: DepositoPersonaCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.depositoPersona.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const depositoPersonaPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: DepositoPersonaCdDeletePopupComponent,
        resolve: {
            depositoPersona: DepositoPersonaCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.depositoPersona.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
