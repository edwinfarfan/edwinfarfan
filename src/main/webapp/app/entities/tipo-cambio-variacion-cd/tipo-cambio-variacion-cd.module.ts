import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CambistaDigitalSharedModule } from 'app/shared';
import {
    TipoCambioVariacionCdComponent,
    TipoCambioVariacionCdDetailComponent,
    TipoCambioVariacionCdUpdateComponent,
    TipoCambioVariacionCdDeletePopupComponent,
    TipoCambioVariacionCdDeleteDialogComponent,
    tipoCambioVariacionRoute,
    tipoCambioVariacionPopupRoute
} from './';

const ENTITY_STATES = [...tipoCambioVariacionRoute, ...tipoCambioVariacionPopupRoute];

@NgModule({
    imports: [CambistaDigitalSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TipoCambioVariacionCdComponent,
        TipoCambioVariacionCdDetailComponent,
        TipoCambioVariacionCdUpdateComponent,
        TipoCambioVariacionCdDeleteDialogComponent,
        TipoCambioVariacionCdDeletePopupComponent
    ],
    entryComponents: [
        TipoCambioVariacionCdComponent,
        TipoCambioVariacionCdUpdateComponent,
        TipoCambioVariacionCdDeleteDialogComponent,
        TipoCambioVariacionCdDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CambistaDigitalTipoCambioVariacionCdModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
