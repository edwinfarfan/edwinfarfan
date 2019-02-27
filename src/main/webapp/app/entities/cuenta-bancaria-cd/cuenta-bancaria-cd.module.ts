import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CambistaDigitalSharedModule } from 'app/shared';
import {
    CuentaBancariaCdComponent,
    CuentaBancariaCdDetailComponent,
    CuentaBancariaCdUpdateComponent,
    CuentaBancariaCdDeletePopupComponent,
    CuentaBancariaCdDeleteDialogComponent,
    cuentaBancariaRoute,
    cuentaBancariaPopupRoute
} from './';

const ENTITY_STATES = [...cuentaBancariaRoute, ...cuentaBancariaPopupRoute];

@NgModule({
    imports: [CambistaDigitalSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CuentaBancariaCdComponent,
        CuentaBancariaCdDetailComponent,
        CuentaBancariaCdUpdateComponent,
        CuentaBancariaCdDeleteDialogComponent,
        CuentaBancariaCdDeletePopupComponent
    ],
    entryComponents: [
        CuentaBancariaCdComponent,
        CuentaBancariaCdUpdateComponent,
        CuentaBancariaCdDeleteDialogComponent,
        CuentaBancariaCdDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CambistaDigitalCuentaBancariaCdModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
