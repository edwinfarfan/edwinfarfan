import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoCambioCd } from 'app/shared/model/tipo-cambio-cd.model';
import { TipoCambioCdService } from './tipo-cambio-cd.service';

@Component({
    selector: '-tipo-cambio-cd-delete-dialog',
    templateUrl: './tipo-cambio-cd-delete-dialog.component.html'
})
export class TipoCambioCdDeleteDialogComponent {
    tipoCambio: ITipoCambioCd;

    constructor(
        protected tipoCambioService: TipoCambioCdService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipoCambioService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'tipoCambioListModification',
                content: 'Deleted an tipoCambio'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: '-tipo-cambio-cd-delete-popup',
    template: ''
})
export class TipoCambioCdDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tipoCambio }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TipoCambioCdDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.tipoCambio = tipoCambio;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/tipo-cambio-cd', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/tipo-cambio-cd', { outlets: { popup: null } }]);
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
