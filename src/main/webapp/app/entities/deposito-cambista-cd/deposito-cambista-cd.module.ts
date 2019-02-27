import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CambistaDigitalSharedModule } from 'app/shared';
import {
    DepositoCambistaCdComponent,
    DepositoCambistaCdDetailComponent,
    DepositoCambistaCdUpdateComponent,
    DepositoCambistaCdDeletePopupComponent,
    DepositoCambistaCdDeleteDialogComponent,
    depositoCambistaRoute,
    depositoCambistaPopupRoute
} from './';

const ENTITY_STATES = [...depositoCambistaRoute, ...depositoCambistaPopupRoute];

@NgModule({
    imports: [CambistaDigitalSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DepositoCambistaCdComponent,
        DepositoCambistaCdDetailComponent,
        DepositoCambistaCdUpdateComponent,
        DepositoCambistaCdDeleteDialogComponent,
        DepositoCambistaCdDeletePopupComponent
    ],
    entryComponents: [
        DepositoCambistaCdComponent,
        DepositoCambistaCdUpdateComponent,
        DepositoCambistaCdDeleteDialogComponent,
        DepositoCambistaCdDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CambistaDigitalDepositoCambistaCdModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
