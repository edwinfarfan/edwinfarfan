import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoCambioCd } from 'app/shared/model/tipo-cambio-cd.model';

@Component({
    selector: '-tipo-cambio-cd-detail',
    templateUrl: './tipo-cambio-cd-detail.component.html'
})
export class TipoCambioCdDetailComponent implements OnInit {
    tipoCambio: ITipoCambioCd;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tipoCambio }) => {
            this.tipoCambio = tipoCambio;
        });
    }

    previousState() {
        window.history.back();
    }
}
