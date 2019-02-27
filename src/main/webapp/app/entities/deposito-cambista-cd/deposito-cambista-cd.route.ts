import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DepositoCambistaCd } from 'app/shared/model/deposito-cambista-cd.model';
import { DepositoCambistaCdService } from './deposito-cambista-cd.service';
import { DepositoCambistaCdComponent } from './deposito-cambista-cd.component';
import { DepositoCambistaCdDetailComponent } from './deposito-cambista-cd-detail.component';
import { DepositoCambistaCdUpdateComponent } from './deposito-cambista-cd-update.component';
import { DepositoCambistaCdDeletePopupComponent } from './deposito-cambista-cd-delete-dialog.component';
import { IDepositoCambistaCd } from 'app/shared/model/deposito-cambista-cd.model';

@Injectable({ providedIn: 'root' })
export class DepositoCambistaCdResolve implements Resolve<IDepositoCambistaCd> {
    constructor(private service: DepositoCambistaCdService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDepositoCambistaCd> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<DepositoCambistaCd>) => response.ok),
                map((depositoCambista: HttpResponse<DepositoCambistaCd>) => depositoCambista.body)
            );
        }
        return of(new DepositoCambistaCd());
    }
}

export const depositoCambistaRoute: Routes = [
    {
        path: '',
        component: DepositoCambistaCdComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.depositoCambista.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: DepositoCambistaCdDetailComponent,
        resolve: {
            depositoCambista: DepositoCambistaCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.depositoCambista.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: DepositoCambistaCdUpdateComponent,
        resolve: {
            depositoCambista: DepositoCambistaCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.depositoCambista.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: DepositoCambistaCdUpdateComponent,
        resolve: {
            depositoCambista: DepositoCambistaCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.depositoCambista.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const depositoCambistaPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: DepositoCambistaCdDeletePopupComponent,
        resolve: {
            depositoCambista: DepositoCambistaCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.depositoCambista.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
