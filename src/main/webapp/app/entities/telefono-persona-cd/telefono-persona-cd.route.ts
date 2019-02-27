import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TelefonoPersonaCd } from 'app/shared/model/telefono-persona-cd.model';
import { TelefonoPersonaCdService } from './telefono-persona-cd.service';
import { TelefonoPersonaCdComponent } from './telefono-persona-cd.component';
import { TelefonoPersonaCdDetailComponent } from './telefono-persona-cd-detail.component';
import { TelefonoPersonaCdUpdateComponent } from './telefono-persona-cd-update.component';
import { TelefonoPersonaCdDeletePopupComponent } from './telefono-persona-cd-delete-dialog.component';
import { ITelefonoPersonaCd } from 'app/shared/model/telefono-persona-cd.model';

@Injectable({ providedIn: 'root' })
export class TelefonoPersonaCdResolve implements Resolve<ITelefonoPersonaCd> {
    constructor(private service: TelefonoPersonaCdService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITelefonoPersonaCd> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TelefonoPersonaCd>) => response.ok),
                map((telefonoPersona: HttpResponse<TelefonoPersonaCd>) => telefonoPersona.body)
            );
        }
        return of(new TelefonoPersonaCd());
    }
}

export const telefonoPersonaRoute: Routes = [
    {
        path: '',
        component: TelefonoPersonaCdComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.telefonoPersona.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: TelefonoPersonaCdDetailComponent,
        resolve: {
            telefonoPersona: TelefonoPersonaCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.telefonoPersona.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: TelefonoPersonaCdUpdateComponent,
        resolve: {
            telefonoPersona: TelefonoPersonaCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.telefonoPersona.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: TelefonoPersonaCdUpdateComponent,
        resolve: {
            telefonoPersona: TelefonoPersonaCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.telefonoPersona.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const telefonoPersonaPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: TelefonoPersonaCdDeletePopupComponent,
        resolve: {
            telefonoPersona: TelefonoPersonaCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.telefonoPersona.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
