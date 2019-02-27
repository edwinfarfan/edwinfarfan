import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TransaccionPersonaCd } from 'app/shared/model/transaccion-persona-cd.model';
import { TransaccionPersonaCdService } from './transaccion-persona-cd.service';
import { TransaccionPersonaCdComponent } from './transaccion-persona-cd.component';
import { TransaccionPersonaCdDetailComponent } from './transaccion-persona-cd-detail.component';
import { TransaccionPersonaCdUpdateComponent } from './transaccion-persona-cd-update.component';
import { TransaccionPersonaCdDeletePopupComponent } from './transaccion-persona-cd-delete-dialog.component';
import { ITransaccionPersonaCd } from 'app/shared/model/transaccion-persona-cd.model';

@Injectable({ providedIn: 'root' })
export class TransaccionPersonaCdResolve implements Resolve<ITransaccionPersonaCd> {
    constructor(private service: TransaccionPersonaCdService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITransaccionPersonaCd> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TransaccionPersonaCd>) => response.ok),
                map((transaccionPersona: HttpResponse<TransaccionPersonaCd>) => transaccionPersona.body)
            );
        }
        return of(new TransaccionPersonaCd());
    }
}

export const transaccionPersonaRoute: Routes = [
    {
        path: '',
        component: TransaccionPersonaCdComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.transaccionPersona.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: TransaccionPersonaCdDetailComponent,
        resolve: {
            transaccionPersona: TransaccionPersonaCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.transaccionPersona.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: TransaccionPersonaCdUpdateComponent,
        resolve: {
            transaccionPersona: TransaccionPersonaCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.transaccionPersona.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: TransaccionPersonaCdUpdateComponent,
        resolve: {
            transaccionPersona: TransaccionPersonaCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.transaccionPersona.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const transaccionPersonaPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: TransaccionPersonaCdDeletePopupComponent,
        resolve: {
            transaccionPersona: TransaccionPersonaCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.transaccionPersona.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
