import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IDepositoPersonaCd } from 'app/shared/model/deposito-persona-cd.model';

@Component({
    selector: '-deposito-persona-cd-detail',
    templateUrl: './deposito-persona-cd-detail.component.html'
})
export class DepositoPersonaCdDetailComponent implements OnInit {
    depositoPersona: IDepositoPersonaCd;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ depositoPersona }) => {
            this.depositoPersona = depositoPersona;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
