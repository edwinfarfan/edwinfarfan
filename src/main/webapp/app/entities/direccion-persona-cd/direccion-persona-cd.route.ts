import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DireccionPersonaCd } from 'app/shared/model/direccion-persona-cd.model';
import { DireccionPersonaCdService } from './direccion-persona-cd.service';
import { DireccionPersonaCdComponent } from './direccion-persona-cd.component';
import { DireccionPersonaCdDetailComponent } from './direccion-persona-cd-detail.component';
import { DireccionPersonaCdUpdateComponent } from './direccion-persona-cd-update.component';
import { DireccionPersonaCdDeletePopupComponent } from './direccion-persona-cd-delete-dialog.component';
import { IDireccionPersonaCd } from 'app/shared/model/direccion-persona-cd.model';

@Injectable({ providedIn: 'root' })
export class DireccionPersonaCdResolve implements Resolve<IDireccionPersonaCd> {
    constructor(private service: DireccionPersonaCdService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDireccionPersonaCd> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<DireccionPersonaCd>) => response.ok),
                map((direccionPersona: HttpResponse<DireccionPersonaCd>) => direccionPersona.body)
            );
        }
        return of(new DireccionPersonaCd());
    }
}

export const direccionPersonaRoute: Routes = [
    {
        path: '',
        component: DireccionPersonaCdComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.direccionPersona.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: DireccionPersonaCdDetailComponent,
        resolve: {
            direccionPersona: DireccionPersonaCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.direccionPersona.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: DireccionPersonaCdUpdateComponent,
        resolve: {
            direccionPersona: DireccionPersonaCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.direccionPersona.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: DireccionPersonaCdUpdateComponent,
        resolve: {
            direccionPersona: DireccionPersonaCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.direccionPersona.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const direccionPersonaPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: DireccionPersonaCdDeletePopupComponent,
        resolve: {
            direccionPersona: DireccionPersonaCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.direccionPersona.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
