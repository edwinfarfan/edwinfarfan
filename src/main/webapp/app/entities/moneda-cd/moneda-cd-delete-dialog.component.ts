import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMonedaCd } from 'app/shared/model/moneda-cd.model';
import { MonedaCdService } from './moneda-cd.service';

@Component({
    selector: '-moneda-cd-delete-dialog',
    templateUrl: './moneda-cd-delete-dialog.component.html'
})
export class MonedaCdDeleteDialogComponent {
    moneda: IMonedaCd;

    constructor(protected monedaService: MonedaCdService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.monedaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'monedaListModification',
                content: 'Deleted an moneda'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: '-moneda-cd-delete-popup',
    template: ''
})
export class MonedaCdDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ moneda }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MonedaCdDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.moneda = moneda;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/moneda-cd', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/moneda-cd', { outlets: { popup: null } }]);
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
