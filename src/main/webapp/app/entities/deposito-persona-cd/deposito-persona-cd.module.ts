import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CambistaDigitalSharedModule } from 'app/shared';
import {
    DepositoPersonaCdComponent,
    DepositoPersonaCdDetailComponent,
    DepositoPersonaCdUpdateComponent,
    DepositoPersonaCdDeletePopupComponent,
    DepositoPersonaCdDeleteDialogComponent,
    depositoPersonaRoute,
    depositoPersonaPopupRoute
} from './';

const ENTITY_STATES = [...depositoPersonaRoute, ...depositoPersonaPopupRoute];

@NgModule({
    imports: [CambistaDigitalSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DepositoPersonaCdComponent,
        DepositoPersonaCdDetailComponent,
        DepositoPersonaCdUpdateComponent,
        DepositoPersonaCdDeleteDialogComponent,
        DepositoPersonaCdDeletePopupComponent
    ],
    entryComponents: [
        DepositoPersonaCdComponent,
        DepositoPersonaCdUpdateComponent,
        DepositoPersonaCdDeleteDialogComponent,
        DepositoPersonaCdDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CambistaDigitalDepositoPersonaCdModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
