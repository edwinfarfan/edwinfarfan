import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CambistaDigitalSharedModule } from 'app/shared';
import {
    TipoDocumentoCdComponent,
    TipoDocumentoCdDetailComponent,
    TipoDocumentoCdUpdateComponent,
    TipoDocumentoCdDeletePopupComponent,
    TipoDocumentoCdDeleteDialogComponent,
    tipoDocumentoRoute,
    tipoDocumentoPopupRoute
} from './';

const ENTITY_STATES = [...tipoDocumentoRoute, ...tipoDocumentoPopupRoute];

@NgModule({
    imports: [CambistaDigitalSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TipoDocumentoCdComponent,
        TipoDocumentoCdDetailComponent,
        TipoDocumentoCdUpdateComponent,
        TipoDocumentoCdDeleteDialogComponent,
        TipoDocumentoCdDeletePopupComponent
    ],
    entryComponents: [
        TipoDocumentoCdComponent,
        TipoDocumentoCdUpdateComponent,
        TipoDocumentoCdDeleteDialogComponent,
        TipoDocumentoCdDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CambistaDigitalTipoDocumentoCdModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
