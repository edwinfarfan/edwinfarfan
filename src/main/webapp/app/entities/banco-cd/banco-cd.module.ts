import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CambistaDigitalSharedModule } from 'app/shared';
import {
    BancoCdComponent,
    BancoCdDetailComponent,
    BancoCdUpdateComponent,
    BancoCdDeletePopupComponent,
    BancoCdDeleteDialogComponent,
    bancoRoute,
    bancoPopupRoute
} from './';

const ENTITY_STATES = [...bancoRoute, ...bancoPopupRoute];

@NgModule({
    imports: [CambistaDigitalSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        BancoCdComponent,
        BancoCdDetailComponent,
        BancoCdUpdateComponent,
        BancoCdDeleteDialogComponent,
        BancoCdDeletePopupComponent
    ],
    entryComponents: [BancoCdComponent, BancoCdUpdateComponent, BancoCdDeleteDialogComponent, BancoCdDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CambistaDigitalBancoCdModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
