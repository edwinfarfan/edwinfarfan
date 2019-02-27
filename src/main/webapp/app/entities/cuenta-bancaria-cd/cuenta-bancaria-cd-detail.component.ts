import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICuentaBancariaCd } from 'app/shared/model/cuenta-bancaria-cd.model';

@Component({
    selector: '-cuenta-bancaria-cd-detail',
    templateUrl: './cuenta-bancaria-cd-detail.component.html'
})
export class CuentaBancariaCdDetailComponent implements OnInit {
    cuentaBancaria: ICuentaBancariaCd;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ cuentaBancaria }) => {
            this.cuentaBancaria = cuentaBancaria;
        });
    }

    previousState() {
        window.history.back();
    }
}
