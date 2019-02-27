import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoCambioVariacionCd } from 'app/shared/model/tipo-cambio-variacion-cd.model';

@Component({
    selector: '-tipo-cambio-variacion-cd-detail',
    templateUrl: './tipo-cambio-variacion-cd-detail.component.html'
})
export class TipoCambioVariacionCdDetailComponent implements OnInit {
    tipoCambioVariacion: ITipoCambioVariacionCd;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tipoCambioVariacion }) => {
            this.tipoCambioVariacion = tipoCambioVariacion;
        });
    }

    previousState() {
        window.history.back();
    }
}
