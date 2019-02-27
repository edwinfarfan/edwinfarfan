import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMonedaCd } from 'app/shared/model/moneda-cd.model';

@Component({
    selector: '-moneda-cd-detail',
    templateUrl: './moneda-cd-detail.component.html'
})
export class MonedaCdDetailComponent implements OnInit {
    moneda: IMonedaCd;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ moneda }) => {
            this.moneda = moneda;
        });
    }

    previousState() {
        window.history.back();
    }
}
