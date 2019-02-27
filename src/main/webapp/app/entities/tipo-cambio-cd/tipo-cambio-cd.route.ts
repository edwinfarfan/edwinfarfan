import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TipoCambioCd } from 'app/shared/model/tipo-cambio-cd.model';
import { TipoCambioCdService } from './tipo-cambio-cd.service';
import { TipoCambioCdComponent } from './tipo-cambio-cd.component';
import { TipoCambioCdDetailComponent } from './tipo-cambio-cd-detail.component';
import { TipoCambioCdUpdateComponent } from './tipo-cambio-cd-update.component';
import { TipoCambioCdDeletePopupComponent } from './tipo-cambio-cd-delete-dialog.component';
import { ITipoCambioCd } from 'app/shared/model/tipo-cambio-cd.model';

@Injectable({ providedIn: 'root' })
export class TipoCambioCdResolve implements Resolve<ITipoCambioCd> {
    constructor(private service: TipoCambioCdService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITipoCambioCd> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TipoCambioCd>) => response.ok),
                map((tipoCambio: HttpResponse<TipoCambioCd>) => tipoCambio.body)
            );
        }
        return of(new TipoCambioCd());
    }
}

export const tipoCambioRoute: Routes = [
    {
        path: '',
        component: TipoCambioCdComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.tipoCambio.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: TipoCambioCdDetailComponent,
        resolve: {
            tipoCambio: TipoCambioCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.tipoCambio.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: TipoCambioCdUpdateComponent,
        resolve: {
            tipoCambio: TipoCambioCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.tipoCambio.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: TipoCambioCdUpdateComponent,
        resolve: {
            tipoCambio: TipoCambioCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.tipoCambio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipoCambioPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: TipoCambioCdDeletePopupComponent,
        resolve: {
            tipoCambio: TipoCambioCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.tipoCambio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
