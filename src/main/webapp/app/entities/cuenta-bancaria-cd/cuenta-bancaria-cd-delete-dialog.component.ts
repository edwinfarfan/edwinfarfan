import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICuentaBancariaCd } from 'app/shared/model/cuenta-bancaria-cd.model';
import { CuentaBancariaCdService } from './cuenta-bancaria-cd.service';

@Component({
    selector: '-cuenta-bancaria-cd-delete-dialog',
    templateUrl: './cuenta-bancaria-cd-delete-dialog.component.html'
})
export class CuentaBancariaCdDeleteDialogComponent {
    cuentaBancaria: ICuentaBancariaCd;

    constructor(
        protected cuentaBancariaService: CuentaBancariaCdService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cuentaBancariaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'cuentaBancariaListModification',
                content: 'Deleted an cuentaBancaria'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: '-cuenta-bancaria-cd-delete-popup',
    template: ''
})
export class CuentaBancariaCdDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ cuentaBancaria }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CuentaBancariaCdDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.cuentaBancaria = cuentaBancaria;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/cuenta-bancaria-cd', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/cuenta-bancaria-cd', { outlets: { popup: null } }]);
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
