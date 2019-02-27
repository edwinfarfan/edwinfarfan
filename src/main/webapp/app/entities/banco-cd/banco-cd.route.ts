import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BancoCd } from 'app/shared/model/banco-cd.model';
import { BancoCdService } from './banco-cd.service';
import { BancoCdComponent } from './banco-cd.component';
import { BancoCdDetailComponent } from './banco-cd-detail.component';
import { BancoCdUpdateComponent } from './banco-cd-update.component';
import { BancoCdDeletePopupComponent } from './banco-cd-delete-dialog.component';
import { IBancoCd } from 'app/shared/model/banco-cd.model';

@Injectable({ providedIn: 'root' })
export class BancoCdResolve implements Resolve<IBancoCd> {
    constructor(private service: BancoCdService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBancoCd> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<BancoCd>) => response.ok),
                map((banco: HttpResponse<BancoCd>) => banco.body)
            );
        }
        return of(new BancoCd());
    }
}

export const bancoRoute: Routes = [
    {
        path: '',
        component: BancoCdComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.banco.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: BancoCdDetailComponent,
        resolve: {
            banco: BancoCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.banco.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: BancoCdUpdateComponent,
        resolve: {
            banco: BancoCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.banco.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: BancoCdUpdateComponent,
        resolve: {
            banco: BancoCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.banco.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bancoPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: BancoCdDeletePopupComponent,
        resolve: {
            banco: BancoCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.banco.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
