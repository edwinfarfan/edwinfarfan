import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDepositoPersonaCd } from 'app/shared/model/deposito-persona-cd.model';
import { DepositoPersonaCdService } from './deposito-persona-cd.service';

@Component({
    selector: '-deposito-persona-cd-delete-dialog',
    templateUrl: './deposito-persona-cd-delete-dialog.component.html'
})
export class DepositoPersonaCdDeleteDialogComponent {
    depositoPersona: IDepositoPersonaCd;

    constructor(
        protected depositoPersonaService: DepositoPersonaCdService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.depositoPersonaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'depositoPersonaListModification',
                content: 'Deleted an depositoPersona'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: '-deposito-persona-cd-delete-popup',
    template: ''
})
export class DepositoPersonaCdDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ depositoPersona }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DepositoPersonaCdDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.depositoPersona = depositoPersona;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/deposito-persona-cd', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/deposito-persona-cd', { outlets: { popup: null } }]);
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
