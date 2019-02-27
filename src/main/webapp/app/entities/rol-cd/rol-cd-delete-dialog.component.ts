import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRolCd } from 'app/shared/model/rol-cd.model';
import { RolCdService } from './rol-cd.service';

@Component({
    selector: '-rol-cd-delete-dialog',
    templateUrl: './rol-cd-delete-dialog.component.html'
})
export class RolCdDeleteDialogComponent {
    rol: IRolCd;

    constructor(protected rolService: RolCdService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.rolService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'rolListModification',
                content: 'Deleted an rol'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: '-rol-cd-delete-popup',
    template: ''
})
export class RolCdDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ rol }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RolCdDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.rol = rol;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/rol-cd', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/rol-cd', { outlets: { popup: null } }]);
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
