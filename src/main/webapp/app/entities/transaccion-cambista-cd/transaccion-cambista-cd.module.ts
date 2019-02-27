import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CambistaDigitalSharedModule } from 'app/shared';
import {
    TransaccionCambistaCdComponent,
    TransaccionCambistaCdDetailComponent,
    TransaccionCambistaCdUpdateComponent,
    TransaccionCambistaCdDeletePopupComponent,
    TransaccionCambistaCdDeleteDialogComponent,
    transaccionCambistaRoute,
    transaccionCambistaPopupRoute
} from './';

const ENTITY_STATES = [...transaccionCambistaRoute, ...transaccionCambistaPopupRoute];

@NgModule({
    imports: [CambistaDigitalSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TransaccionCambistaCdComponent,
        TransaccionCambistaCdDetailComponent,
        TransaccionCambistaCdUpdateComponent,
        TransaccionCambistaCdDeleteDialogComponent,
        TransaccionCambistaCdDeletePopupComponent
    ],
    entryComponents: [
        TransaccionCambistaCdComponent,
        TransaccionCambistaCdUpdateComponent,
        TransaccionCambistaCdDeleteDialogComponent,
        TransaccionCambistaCdDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CambistaDigitalTransaccionCambistaCdModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
