import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CambistaDigitalSharedModule } from 'app/shared';
import {
    RolCdComponent,
    RolCdDetailComponent,
    RolCdUpdateComponent,
    RolCdDeletePopupComponent,
    RolCdDeleteDialogComponent,
    rolRoute,
    rolPopupRoute
} from './';

const ENTITY_STATES = [...rolRoute, ...rolPopupRoute];

@NgModule({
    imports: [CambistaDigitalSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [RolCdComponent, RolCdDetailComponent, RolCdUpdateComponent, RolCdDeleteDialogComponent, RolCdDeletePopupComponent],
    entryComponents: [RolCdComponent, RolCdUpdateComponent, RolCdDeleteDialogComponent, RolCdDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CambistaDigitalRolCdModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
