import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CambistaDigitalSharedModule } from 'app/shared';
import {
    PermisoCdComponent,
    PermisoCdDetailComponent,
    PermisoCdUpdateComponent,
    PermisoCdDeletePopupComponent,
    PermisoCdDeleteDialogComponent,
    permisoRoute,
    permisoPopupRoute
} from './';

const ENTITY_STATES = [...permisoRoute, ...permisoPopupRoute];

@NgModule({
    imports: [CambistaDigitalSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PermisoCdComponent,
        PermisoCdDetailComponent,
        PermisoCdUpdateComponent,
        PermisoCdDeleteDialogComponent,
        PermisoCdDeletePopupComponent
    ],
    entryComponents: [PermisoCdComponent, PermisoCdUpdateComponent, PermisoCdDeleteDialogComponent, PermisoCdDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CambistaDigitalPermisoCdModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
