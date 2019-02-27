import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUsuarioRolCd } from 'app/shared/model/usuario-rol-cd.model';

@Component({
    selector: '-usuario-rol-cd-detail',
    templateUrl: './usuario-rol-cd-detail.component.html'
})
export class UsuarioRolCdDetailComponent implements OnInit {
    usuarioRol: IUsuarioRolCd;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ usuarioRol }) => {
            this.usuarioRol = usuarioRol;
        });
    }

    previousState() {
        window.history.back();
    }
}
