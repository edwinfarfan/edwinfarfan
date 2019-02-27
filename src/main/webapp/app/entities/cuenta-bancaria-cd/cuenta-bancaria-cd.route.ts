import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CuentaBancariaCd } from 'app/shared/model/cuenta-bancaria-cd.model';
import { CuentaBancariaCdService } from './cuenta-bancaria-cd.service';
import { CuentaBancariaCdComponent } from './cuenta-bancaria-cd.component';
import { CuentaBancariaCdDetailComponent } from './cuenta-bancaria-cd-detail.component';
import { CuentaBancariaCdUpdateComponent } from './cuenta-bancaria-cd-update.component';
import { CuentaBancariaCdDeletePopupComponent } from './cuenta-bancaria-cd-delete-dialog.component';
import { ICuentaBancariaCd } from 'app/shared/model/cuenta-bancaria-cd.model';

@Injectable({ providedIn: 'root' })
export class CuentaBancariaCdResolve implements Resolve<ICuentaBancariaCd> {
    constructor(private service: CuentaBancariaCdService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICuentaBancariaCd> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<CuentaBancariaCd>) => response.ok),
                map((cuentaBancaria: HttpResponse<CuentaBancariaCd>) => cuentaBancaria.body)
            );
        }
        return of(new CuentaBancariaCd());
    }
}

export const cuentaBancariaRoute: Routes = [
    {
        path: '',
        component: CuentaBancariaCdComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.cuentaBancaria.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: CuentaBancariaCdDetailComponent,
        resolve: {
            cuentaBancaria: CuentaBancariaCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.cuentaBancaria.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: CuentaBancariaCdUpdateComponent,
        resolve: {
            cuentaBancaria: CuentaBancariaCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.cuentaBancaria.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: CuentaBancariaCdUpdateComponent,
        resolve: {
            cuentaBancaria: CuentaBancariaCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.cuentaBancaria.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cuentaBancariaPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: CuentaBancariaCdDeletePopupComponent,
        resolve: {
            cuentaBancaria: CuentaBancariaCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.cuentaBancaria.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
