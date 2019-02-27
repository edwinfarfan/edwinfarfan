import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TipoDocumentoCd } from 'app/shared/model/tipo-documento-cd.model';
import { TipoDocumentoCdService } from './tipo-documento-cd.service';
import { TipoDocumentoCdComponent } from './tipo-documento-cd.component';
import { TipoDocumentoCdDetailComponent } from './tipo-documento-cd-detail.component';
import { TipoDocumentoCdUpdateComponent } from './tipo-documento-cd-update.component';
import { TipoDocumentoCdDeletePopupComponent } from './tipo-documento-cd-delete-dialog.component';
import { ITipoDocumentoCd } from 'app/shared/model/tipo-documento-cd.model';

@Injectable({ providedIn: 'root' })
export class TipoDocumentoCdResolve implements Resolve<ITipoDocumentoCd> {
    constructor(private service: TipoDocumentoCdService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITipoDocumentoCd> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TipoDocumentoCd>) => response.ok),
                map((tipoDocumento: HttpResponse<TipoDocumentoCd>) => tipoDocumento.body)
            );
        }
        return of(new TipoDocumentoCd());
    }
}

export const tipoDocumentoRoute: Routes = [
    {
        path: '',
        component: TipoDocumentoCdComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.tipoDocumento.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: TipoDocumentoCdDetailComponent,
        resolve: {
            tipoDocumento: TipoDocumentoCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.tipoDocumento.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: TipoDocumentoCdUpdateComponent,
        resolve: {
            tipoDocumento: TipoDocumentoCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.tipoDocumento.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: TipoDocumentoCdUpdateComponent,
        resolve: {
            tipoDocumento: TipoDocumentoCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.tipoDocumento.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipoDocumentoPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: TipoDocumentoCdDeletePopupComponent,
        resolve: {
            tipoDocumento: TipoDocumentoCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.tipoDocumento.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
