import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITelefonoPersonaCd } from 'app/shared/model/telefono-persona-cd.model';
import { TelefonoPersonaCdService } from './telefono-persona-cd.service';

@Component({
    selector: '-telefono-persona-cd-delete-dialog',
    templateUrl: './telefono-persona-cd-delete-dialog.component.html'
})
export class TelefonoPersonaCdDeleteDialogComponent {
    telefonoPersona: ITelefonoPersonaCd;

    constructor(
        protected telefonoPersonaService: TelefonoPersonaCdService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.telefonoPersonaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'telefonoPersonaListModification',
                content: 'Deleted an telefonoPersona'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: '-telefono-persona-cd-delete-popup',
    template: ''
})
export class TelefonoPersonaCdDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ telefonoPersona }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TelefonoPersonaCdDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.telefonoPersona = telefonoPersona;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/telefono-persona-cd', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/telefono-persona-cd', { outlets: { popup: null } }]);
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
