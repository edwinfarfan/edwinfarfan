import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CambistaDigitalSharedModule } from 'app/shared';
import {
    TransaccionPersonaCdComponent,
    TransaccionPersonaCdDetailComponent,
    TransaccionPersonaCdUpdateComponent,
    TransaccionPersonaCdDeletePopupComponent,
    TransaccionPersonaCdDeleteDialogComponent,
    transaccionPersonaRoute,
    transaccionPersonaPopupRoute
} from './';

const ENTITY_STATES = [...transaccionPersonaRoute, ...transaccionPersonaPopupRoute];

@NgModule({
    imports: [CambistaDigitalSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TransaccionPersonaCdComponent,
        TransaccionPersonaCdDetailComponent,
        TransaccionPersonaCdUpdateComponent,
        TransaccionPersonaCdDeleteDialogComponent,
        TransaccionPersonaCdDeletePopupComponent
    ],
    entryComponents: [
        TransaccionPersonaCdComponent,
        TransaccionPersonaCdUpdateComponent,
        TransaccionPersonaCdDeleteDialogComponent,
        TransaccionPersonaCdDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CambistaDigitalTransaccionPersonaCdModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
