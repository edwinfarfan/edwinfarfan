import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TipoCambioVariacionCd } from 'app/shared/model/tipo-cambio-variacion-cd.model';
import { TipoCambioVariacionCdService } from './tipo-cambio-variacion-cd.service';
import { TipoCambioVariacionCdComponent } from './tipo-cambio-variacion-cd.component';
import { TipoCambioVariacionCdDetailComponent } from './tipo-cambio-variacion-cd-detail.component';
import { TipoCambioVariacionCdUpdateComponent } from './tipo-cambio-variacion-cd-update.component';
import { TipoCambioVariacionCdDeletePopupComponent } from './tipo-cambio-variacion-cd-delete-dialog.component';
import { ITipoCambioVariacionCd } from 'app/shared/model/tipo-cambio-variacion-cd.model';

@Injectable({ providedIn: 'root' })
export class TipoCambioVariacionCdResolve implements Resolve<ITipoCambioVariacionCd> {
    constructor(private service: TipoCambioVariacionCdService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITipoCambioVariacionCd> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TipoCambioVariacionCd>) => response.ok),
                map((tipoCambioVariacion: HttpResponse<TipoCambioVariacionCd>) => tipoCambioVariacion.body)
            );
        }
        return of(new TipoCambioVariacionCd());
    }
}

export const tipoCambioVariacionRoute: Routes = [
    {
        path: '',
        component: TipoCambioVariacionCdComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.tipoCambioVariacion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: TipoCambioVariacionCdDetailComponent,
        resolve: {
            tipoCambioVariacion: TipoCambioVariacionCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.tipoCambioVariacion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: TipoCambioVariacionCdUpdateComponent,
        resolve: {
            tipoCambioVariacion: TipoCambioVariacionCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.tipoCambioVariacion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: TipoCambioVariacionCdUpdateComponent,
        resolve: {
            tipoCambioVariacion: TipoCambioVariacionCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.tipoCambioVariacion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipoCambioVariacionPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: TipoCambioVariacionCdDeletePopupComponent,
        resolve: {
            tipoCambioVariacion: TipoCambioVariacionCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.tipoCambioVariacion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
