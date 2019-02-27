import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CambistaDigitalSharedModule } from 'app/shared';
import {
    TelefonoPersonaCdComponent,
    TelefonoPersonaCdDetailComponent,
    TelefonoPersonaCdUpdateComponent,
    TelefonoPersonaCdDeletePopupComponent,
    TelefonoPersonaCdDeleteDialogComponent,
    telefonoPersonaRoute,
    telefonoPersonaPopupRoute
} from './';

const ENTITY_STATES = [...telefonoPersonaRoute, ...telefonoPersonaPopupRoute];

@NgModule({
    imports: [CambistaDigitalSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TelefonoPersonaCdComponent,
        TelefonoPersonaCdDetailComponent,
        TelefonoPersonaCdUpdateComponent,
        TelefonoPersonaCdDeleteDialogComponent,
        TelefonoPersonaCdDeletePopupComponent
    ],
    entryComponents: [
        TelefonoPersonaCdComponent,
        TelefonoPersonaCdUpdateComponent,
        TelefonoPersonaCdDeleteDialogComponent,
        TelefonoPersonaCdDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CambistaDigitalTelefonoPersonaCdModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
