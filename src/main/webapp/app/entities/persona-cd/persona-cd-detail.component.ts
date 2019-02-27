import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPersonaCd } from 'app/shared/model/persona-cd.model';

@Component({
    selector: '-persona-cd-detail',
    templateUrl: './persona-cd-detail.component.html'
})
export class PersonaCdDetailComponent implements OnInit {
    persona: IPersonaCd;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ persona }) => {
            this.persona = persona;
        });
    }

    previousState() {
        window.history.back();
    }
}
