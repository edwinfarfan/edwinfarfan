import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoCambioVariacionCd } from 'app/shared/model/tipo-cambio-variacion-cd.model';
import { TipoCambioVariacionCdService } from './tipo-cambio-variacion-cd.service';

@Component({
    selector: '-tipo-cambio-variacion-cd-delete-dialog',
    templateUrl: './tipo-cambio-variacion-cd-delete-dialog.component.html'
})
export class TipoCambioVariacionCdDeleteDialogComponent {
    tipoCambioVariacion: ITipoCambioVariacionCd;

    constructor(
        protected tipoCambioVariacionService: TipoCambioVariacionCdService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipoCambioVariacionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'tipoCambioVariacionListModification',
                content: 'Deleted an tipoCambioVariacion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: '-tipo-cambio-variacion-cd-delete-popup',
    template: ''
})
export class TipoCambioVariacionCdDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tipoCambioVariacion }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TipoCambioVariacionCdDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.tipoCambioVariacion = tipoCambioVariacion;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/tipo-cambio-variacion-cd', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/tipo-cambio-variacion-cd', { outlets: { popup: null } }]);
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
