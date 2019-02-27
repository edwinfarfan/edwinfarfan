import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoDocumentoCd } from 'app/shared/model/tipo-documento-cd.model';

@Component({
    selector: '-tipo-documento-cd-detail',
    templateUrl: './tipo-documento-cd-detail.component.html'
})
export class TipoDocumentoCdDetailComponent implements OnInit {
    tipoDocumento: ITipoDocumentoCd;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tipoDocumento }) => {
            this.tipoDocumento = tipoDocumento;
        });
    }

    previousState() {
        window.history.back();
    }
}
