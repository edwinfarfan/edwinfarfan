import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBancoCd } from 'app/shared/model/banco-cd.model';

@Component({
    selector: '-banco-cd-detail',
    templateUrl: './banco-cd-detail.component.html'
})
export class BancoCdDetailComponent implements OnInit {
    banco: IBancoCd;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ banco }) => {
            this.banco = banco;
        });
    }

    previousState() {
        window.history.back();
    }
}
