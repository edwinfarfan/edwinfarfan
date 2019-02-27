import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CambistaDigitalSharedModule } from 'app/shared';
import {
    PersonaCdComponent,
    PersonaCdDetailComponent,
    PersonaCdUpdateComponent,
    PersonaCdDeletePopupComponent,
    PersonaCdDeleteDialogComponent,
    personaRoute,
    personaPopupRoute
} from './';

const ENTITY_STATES = [...personaRoute, ...personaPopupRoute];

@NgModule({
    imports: [CambistaDigitalSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PersonaCdComponent,
        PersonaCdDetailComponent,
        PersonaCdUpdateComponent,
        PersonaCdDeleteDialogComponent,
        PersonaCdDeletePopupComponent
    ],
    entryComponents: [PersonaCdComponent, PersonaCdUpdateComponent, PersonaCdDeleteDialogComponent, PersonaCdDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CambistaDigitalPersonaCdModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
