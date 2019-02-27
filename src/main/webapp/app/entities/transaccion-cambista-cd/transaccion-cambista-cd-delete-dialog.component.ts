import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITransaccionCambistaCd } from 'app/shared/model/transaccion-cambista-cd.model';
import { TransaccionCambistaCdService } from './transaccion-cambista-cd.service';

@Component({
    selector: '-transaccion-cambista-cd-delete-dialog',
    templateUrl: './transaccion-cambista-cd-delete-dialog.component.html'
})
export class TransaccionCambistaCdDeleteDialogComponent {
    transaccionCambista: ITransaccionCambistaCd;

    constructor(
        protected transaccionCambistaService: TransaccionCambistaCdService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.transaccionCambistaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'transaccionCambistaListModification',
                content: 'Deleted an transaccionCambista'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: '-transaccion-cambista-cd-delete-popup',
    template: ''
})
export class TransaccionCambistaCdDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ transaccionCambista }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TransaccionCambistaCdDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.transaccionCambista = transaccionCambista;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/transaccion-cambista-cd', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/transaccion-cambista-cd', { outlets: { popup: null } }]);
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
