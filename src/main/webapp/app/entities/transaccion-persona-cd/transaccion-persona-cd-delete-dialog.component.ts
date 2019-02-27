import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITransaccionPersonaCd } from 'app/shared/model/transaccion-persona-cd.model';
import { TransaccionPersonaCdService } from './transaccion-persona-cd.service';

@Component({
    selector: '-transaccion-persona-cd-delete-dialog',
    templateUrl: './transaccion-persona-cd-delete-dialog.component.html'
})
export class TransaccionPersonaCdDeleteDialogComponent {
    transaccionPersona: ITransaccionPersonaCd;

    constructor(
        protected transaccionPersonaService: TransaccionPersonaCdService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.transaccionPersonaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'transaccionPersonaListModification',
                content: 'Deleted an transaccionPersona'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: '-transaccion-persona-cd-delete-popup',
    template: ''
})
export class TransaccionPersonaCdDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ transaccionPersona }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TransaccionPersonaCdDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.transaccionPersona = transaccionPersona;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/transaccion-persona-cd', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/transaccion-persona-cd', { outlets: { popup: null } }]);
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
