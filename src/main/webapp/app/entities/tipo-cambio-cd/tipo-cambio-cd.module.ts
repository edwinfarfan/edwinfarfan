import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CambistaDigitalSharedModule } from 'app/shared';
import {
    TipoCambioCdComponent,
    TipoCambioCdDetailComponent,
    TipoCambioCdUpdateComponent,
    TipoCambioCdDeletePopupComponent,
    TipoCambioCdDeleteDialogComponent,
    tipoCambioRoute,
    tipoCambioPopupRoute
} from './';

const ENTITY_STATES = [...tipoCambioRoute, ...tipoCambioPopupRoute];

@NgModule({
    imports: [CambistaDigitalSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TipoCambioCdComponent,
        TipoCambioCdDetailComponent,
        TipoCambioCdUpdateComponent,
        TipoCambioCdDeleteDialogComponent,
        TipoCambioCdDeletePopupComponent
    ],
    entryComponents: [
        TipoCambioCdComponent,
        TipoCambioCdUpdateComponent,
        TipoCambioCdDeleteDialogComponent,
        TipoCambioCdDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CambistaDigitalTipoCambioCdModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
