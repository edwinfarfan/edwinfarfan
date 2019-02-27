import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PersonaCd } from 'app/shared/model/persona-cd.model';
import { PersonaCdService } from './persona-cd.service';
import { PersonaCdComponent } from './persona-cd.component';
import { PersonaCdDetailComponent } from './persona-cd-detail.component';
import { PersonaCdUpdateComponent } from './persona-cd-update.component';
import { PersonaCdDeletePopupComponent } from './persona-cd-delete-dialog.component';
import { IPersonaCd } from 'app/shared/model/persona-cd.model';

@Injectable({ providedIn: 'root' })
export class PersonaCdResolve implements Resolve<IPersonaCd> {
    constructor(private service: PersonaCdService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPersonaCd> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PersonaCd>) => response.ok),
                map((persona: HttpResponse<PersonaCd>) => persona.body)
            );
        }
        return of(new PersonaCd());
    }
}

export const personaRoute: Routes = [
    {
        path: '',
        component: PersonaCdComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.persona.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: PersonaCdDetailComponent,
        resolve: {
            persona: PersonaCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.persona.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: PersonaCdUpdateComponent,
        resolve: {
            persona: PersonaCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.persona.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: PersonaCdUpdateComponent,
        resolve: {
            persona: PersonaCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.persona.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const personaPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: PersonaCdDeletePopupComponent,
        resolve: {
            persona: PersonaCdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cambistaDigitalApp.persona.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
