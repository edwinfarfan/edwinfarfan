import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDireccionPersonaCd } from 'app/shared/model/direccion-persona-cd.model';

@Component({
    selector: '-direccion-persona-cd-detail',
    templateUrl: './direccion-persona-cd-detail.component.html'
})
export class DireccionPersonaCdDetailComponent implements OnInit {
    direccionPersona: IDireccionPersonaCd;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ direccionPersona }) => {
            this.direccionPersona = direccionPersona;
        });
    }

    previousState() {
        window.history.back();
    }
}
