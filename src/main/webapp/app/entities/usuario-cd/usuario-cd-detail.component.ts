import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUsuarioCd } from 'app/shared/model/usuario-cd.model';

@Component({
    selector: '-usuario-cd-detail',
    templateUrl: './usuario-cd-detail.component.html'
})
export class UsuarioCdDetailComponent implements OnInit {
    usuario: IUsuarioCd;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ usuario }) => {
            this.usuario = usuario;
        });
    }

    previousState() {
        window.history.back();
    }
}
