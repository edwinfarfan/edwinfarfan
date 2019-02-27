import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBancoCd } from 'app/shared/model/banco-cd.model';
import { BancoCdService } from './banco-cd.service';

@Component({
    selector: '-banco-cd-delete-dialog',
    templateUrl: './banco-cd-delete-dialog.component.html'
})
export class BancoCdDeleteDialogComponent {
    banco: IBancoCd;

    constructor(protected bancoService: BancoCdService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.bancoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'bancoListModification',
                content: 'Deleted an banco'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: '-banco-cd-delete-popup',
    template: ''
})
export class BancoCdDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ banco }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(BancoCdDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.banco = banco;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/banco-cd', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/banco-cd', { outlets: { popup: null } }]);
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
