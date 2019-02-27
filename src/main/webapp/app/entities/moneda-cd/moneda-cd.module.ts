import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CambistaDigitalSharedModule } from 'app/shared';
import {
    MonedaCdComponent,
    MonedaCdDetailComponent,
    MonedaCdUpdateComponent,
    MonedaCdDeletePopupComponent,
    MonedaCdDeleteDialogComponent,
    monedaRoute,
    monedaPopupRoute
} from './';

const ENTITY_STATES = [...monedaRoute, ...monedaPopupRoute];

@NgModule({
    imports: [CambistaDigitalSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MonedaCdComponent,
        MonedaCdDetailComponent,
        MonedaCdUpdateComponent,
        MonedaCdDeleteDialogComponent,
        MonedaCdDeletePopupComponent
    ],
    entryComponents: [MonedaCdComponent, MonedaCdUpdateComponent, MonedaCdDeleteDialogComponent, MonedaCdDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CambistaDigitalMonedaCdModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
