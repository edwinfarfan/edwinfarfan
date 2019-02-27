import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITelefonoPersonaCd } from 'app/shared/model/telefono-persona-cd.model';

@Component({
    selector: '-telefono-persona-cd-detail',
    templateUrl: './telefono-persona-cd-detail.component.html'
})
export class TelefonoPersonaCdDetailComponent implements OnInit {
    telefonoPersona: ITelefonoPersonaCd;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ telefonoPersona }) => {
            this.telefonoPersona = telefonoPersona;
        });
    }

    previousState() {
        window.history.back();
    }
}
