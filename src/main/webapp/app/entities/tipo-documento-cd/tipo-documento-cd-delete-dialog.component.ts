import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoDocumentoCd } from 'app/shared/model/tipo-documento-cd.model';
import { TipoDocumentoCdService } from './tipo-documento-cd.service';

@Component({
    selector: '-tipo-documento-cd-delete-dialog',
    templateUrl: './tipo-documento-cd-delete-dialog.component.html'
})
export class TipoDocumentoCdDeleteDialogComponent {
    tipoDocumento: ITipoDocumentoCd;

    constructor(
        protected tipoDocumentoService: TipoDocumentoCdService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipoDocumentoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'tipoDocumentoListModification',
                content: 'Deleted an tipoDocumento'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: '-tipo-documento-cd-delete-popup',
    template: ''
})
export class TipoDocumentoCdDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tipoDocumento }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TipoDocumentoCdDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.tipoDocumento = tipoDocumento;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/tipo-documento-cd', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/tipo-documento-cd', { outlets: { popup: null } }]);
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
