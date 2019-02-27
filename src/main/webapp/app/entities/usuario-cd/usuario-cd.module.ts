import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CambistaDigitalSharedModule } from 'app/shared';
import {
    UsuarioCdComponent,
    UsuarioCdDetailComponent,
    UsuarioCdUpdateComponent,
    UsuarioCdDeletePopupComponent,
    UsuarioCdDeleteDialogComponent,
    usuarioRoute,
    usuarioPopupRoute
} from './';

const ENTITY_STATES = [...usuarioRoute, ...usuarioPopupRoute];

@NgModule({
    imports: [CambistaDigitalSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        UsuarioCdComponent,
        UsuarioCdDetailComponent,
        UsuarioCdUpdateComponent,
        UsuarioCdDeleteDialogComponent,
        UsuarioCdDeletePopupComponent
    ],
    entryComponents: [UsuarioCdComponent, UsuarioCdUpdateComponent, UsuarioCdDeleteDialogComponent, UsuarioCdDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CambistaDigitalUsuarioCdModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
