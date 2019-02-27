import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TransaccionCambistaCd } from 'app/shared/model/transaccion-cambista-cd.model';
import { TransaccionCambistaCdService } from './transaccion-cambista-cd.service';
import { TransaccionCambistaCdComponent } from './transaccion-cambista-cd.component';
import { TransaccionCambistaCdDetailComponent } from './transaccion-cambista-cd-detail.component';
import { TransaccionCambistaCdUpdateComponent } from './transaccion-cambista-cd-update.component';
import { TransaccionCambistaCdDeletePopupComponent } from './transaccion-cambista-cd-delete-dialog.component';
import { ITransaccionCambistaCd } from 'app/shared/model/transaccion-cambista-cd.model';

@Injectable({ providedIn: 'root' })
export class TransaccionCambistaCdResolve implements Resolve<ITransaccionCambistaCd> {
    constructor(private service: TransaccionCambistaCdService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITransaccionCambistaCd> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TransaccionCambistaCd>) => response.ok),
                map((transaccionCambista: HttpResponse<TransaccionCambistaCd>) => transaccionCambista.body)
            );
        }
        return of(new TransaccionCambistaCd());
    }
}

export const transaccionCambistaRoute: Routes = [
    {
        path: '',
        component: TransaccionCambistaCdComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.transaccionCambista.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: TransaccionCambistaCdDetailComponent,
        resolve: {
            transaccionCambista: TransaccionCambistaCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.transaccionCambista.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: TransaccionCambistaCdUpdateComponent,
        resolve: {
            transaccionCambista: TransaccionCambistaCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.transaccionCambista.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: TransaccionCambistaCdUpdateComponent,
        resolve: {
            transaccionCambista: TransaccionCambistaCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.transaccionCambista.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const transaccionCambistaPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: TransaccionCambistaCdDeletePopupComponent,
        resolve: {
            transaccionCambista: TransaccionCambistaCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.transaccionCambista.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
