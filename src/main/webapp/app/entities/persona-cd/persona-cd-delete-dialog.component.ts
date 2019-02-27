import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPersonaCd } from 'app/shared/model/persona-cd.model';
import { PersonaCdService } from './persona-cd.service';

@Component({
    selector: '-persona-cd-delete-dialog',
    templateUrl: './persona-cd-delete-dialog.component.html'
})
export class PersonaCdDeleteDialogComponent {
    persona: IPersonaCd;

    constructor(protected personaService: PersonaCdService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.personaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'personaListModification',
                content: 'Deleted an persona'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: '-persona-cd-delete-popup',
    template: ''
})
export class PersonaCdDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ persona }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PersonaCdDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.persona = persona;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/persona-cd', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/persona-cd', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
