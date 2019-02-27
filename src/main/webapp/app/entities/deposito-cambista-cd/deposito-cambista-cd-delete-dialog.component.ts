import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDepositoCambistaCd } from 'app/shared/model/deposito-cambista-cd.model';
import { DepositoCambistaCdService } from './deposito-cambista-cd.service';

@Component({
    selector: '-deposito-cambista-cd-delete-dialog',
    templateUrl: './deposito-cambista-cd-delete-dialog.component.html'
})
export class DepositoCambistaCdDeleteDialogComponent {
    depositoCambista: IDepositoCambistaCd;

    constructor(
        protected depositoCambistaService: DepositoCambistaCdService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.depositoCambistaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'depositoCambistaListModification',
                content: 'Deleted an depositoCambista'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: '-deposito-cambista-cd-delete-popup',
    template: ''
})
export class DepositoCambistaCdDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ depositoCambista }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DepositoCambistaCdDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.depositoCambista = depositoCambista;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/deposito-cambista-cd', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/deposito-cambista-cd', { outlets: { popup: null } }]);
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
