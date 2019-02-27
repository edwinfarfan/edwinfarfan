import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CambistaDigitalSharedModule } from 'app/shared';
import {
    DireccionPersonaCdComponent,
    DireccionPersonaCdDetailComponent,
    DireccionPersonaCdUpdateComponent,
    DireccionPersonaCdDeletePopupComponent,
    DireccionPersonaCdDeleteDialogComponent,
    direccionPersonaRoute,
    direccionPersonaPopupRoute
} from './';

const ENTITY_STATES = [...direccionPersonaRoute, ...direccionPersonaPopupRoute];

@NgModule({
    imports: [CambistaDigitalSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DireccionPersonaCdComponent,
        DireccionPersonaCdDetailComponent,
        DireccionPersonaCdUpdateComponent,
        DireccionPersonaCdDeleteDialogComponent,
        DireccionPersonaCdDeletePopupComponent
    ],
    entryComponents: [
        DireccionPersonaCdComponent,
        DireccionPersonaCdUpdateComponent,
        DireccionPersonaCdDeleteDialogComponent,
        DireccionPersonaCdDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CambistaDigitalDireccionPersonaCdModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
