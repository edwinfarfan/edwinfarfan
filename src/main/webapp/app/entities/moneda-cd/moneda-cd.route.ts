import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MonedaCd } from 'app/shared/model/moneda-cd.model';
import { MonedaCdService } from './moneda-cd.service';
import { MonedaCdComponent } from './moneda-cd.component';
import { MonedaCdDetailComponent } from './moneda-cd-detail.component';
import { MonedaCdUpdateComponent } from './moneda-cd-update.component';
import { MonedaCdDeletePopupComponent } from './moneda-cd-delete-dialog.component';
import { IMonedaCd } from 'app/shared/model/moneda-cd.model';

@Injectable({ providedIn: 'root' })
export class MonedaCdResolve implements Resolve<IMonedaCd> {
    constructor(private service: MonedaCdService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMonedaCd> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<MonedaCd>) => response.ok),
                map((moneda: HttpResponse<MonedaCd>) => moneda.body)
            );
        }
        return of(new MonedaCd());
    }
}

export const monedaRoute: Routes = [
    {
        path: '',
        component: MonedaCdComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.moneda.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: MonedaCdDetailComponent,
        resolve: {
            moneda: MonedaCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.moneda.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: MonedaCdUpdateComponent,
        resolve: {
            moneda: MonedaCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.moneda.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: MonedaCdUpdateComponent,
        resolve: {
            moneda: MonedaCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.moneda.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const monedaPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: MonedaCdDeletePopupComponent,
        resolve: {
            moneda: MonedaCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.moneda.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
