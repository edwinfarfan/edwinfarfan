import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITransaccionPersonaCd } from 'app/shared/model/transaccion-persona-cd.model';

@Component({
    selector: '-transaccion-persona-cd-detail',
    templateUrl: './transaccion-persona-cd-detail.component.html'
})
export class TransaccionPersonaCdDetailComponent implements OnInit {
    transaccionPersona: ITransaccionPersonaCd;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ transaccionPersona }) => {
            this.transaccionPersona = transaccionPersona;
        });
    }

    previousState() {
        window.history.back();
    }
}
