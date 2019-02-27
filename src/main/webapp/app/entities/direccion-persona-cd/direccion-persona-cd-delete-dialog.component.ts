import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDireccionPersonaCd } from 'app/shared/model/direccion-persona-cd.model';
import { DireccionPersonaCdService } from './direccion-persona-cd.service';

@Component({
    selector: '-direccion-persona-cd-delete-dialog',
    templateUrl: './direccion-persona-cd-delete-dialog.component.html'
})
export class DireccionPersonaCdDeleteDialogComponent {
    direccionPersona: IDireccionPersonaCd;

    constructor(
        protected direccionPersonaService: DireccionPersonaCdService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.direccionPersonaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'direccionPersonaListModification',
                content: 'Deleted an direccionPersona'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: '-direccion-persona-cd-delete-popup',
    template: ''
})
export class DireccionPersonaCdDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ direccionPersona }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DireccionPersonaCdDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.direccionPersona = direccionPersona;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/direccion-persona-cd', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/direccion-persona-cd', { outlets: { popup: null } }]);
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
