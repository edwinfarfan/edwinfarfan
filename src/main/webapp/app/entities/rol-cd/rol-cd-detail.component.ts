import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRolCd } from 'app/shared/model/rol-cd.model';

@Component({
    selector: '-rol-cd-detail',
    templateUrl: './rol-cd-detail.component.html'
})
export class RolCdDetailComponent implements OnInit {
    rol: IRolCd;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ rol }) => {
            this.rol = rol;
        });
    }

    previousState() {
        window.history.back();
    }
}
