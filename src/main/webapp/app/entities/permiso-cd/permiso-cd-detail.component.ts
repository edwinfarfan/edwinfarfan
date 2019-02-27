import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPermisoCd } from 'app/shared/model/permiso-cd.model';

@Component({
    selector: '-permiso-cd-detail',
    templateUrl: './permiso-cd-detail.component.html'
})
export class PermisoCdDetailComponent implements OnInit {
    permiso: IPermisoCd;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ permiso }) => {
            this.permiso = permiso;
        });
    }

    previousState() {
        window.history.back();
    }
}
