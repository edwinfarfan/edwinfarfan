import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITransaccionCambistaCd } from 'app/shared/model/transaccion-cambista-cd.model';

@Component({
    selector: '-transaccion-cambista-cd-detail',
    templateUrl: './transaccion-cambista-cd-detail.component.html'
})
export class TransaccionCambistaCdDetailComponent implements OnInit {
    transaccionCambista: ITransaccionCambistaCd;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ transaccionCambista }) => {
            this.transaccionCambista = transaccionCambista;
        });
    }

    previousState() {
        window.history.back();
    }
}
