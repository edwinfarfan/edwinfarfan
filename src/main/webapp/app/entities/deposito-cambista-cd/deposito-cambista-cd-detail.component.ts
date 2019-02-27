import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IDepositoCambistaCd } from 'app/shared/model/deposito-cambista-cd.model';

@Component({
    selector: '-deposito-cambista-cd-detail',
    templateUrl: './deposito-cambista-cd-detail.component.html'
})
export class DepositoCambistaCdDetailComponent implements OnInit {
    depositoCambista: IDepositoCambistaCd;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ depositoCambista }) => {
            this.depositoCambista = depositoCambista;
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
