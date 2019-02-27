import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPermisoCd } from 'app/shared/model/permiso-cd.model';
import { PermisoCdService } from './permiso-cd.service';

@Component({
    selector: '-permiso-cd-delete-dialog',
    templateUrl: './permiso-cd-delete-dialog.component.html'
})
export class PermisoCdDeleteDialogComponent {
    permiso: IPermisoCd;

    constructor(protected permisoService: PermisoCdService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.permisoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'permisoListModification',
                content: 'Deleted an permiso'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: '-permiso-cd-delete-popup',
    template: ''
})
export class PermisoCdDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ permiso }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PermisoCdDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.permiso = permiso;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/permiso-cd', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/permiso-cd', { outlets: { popup: null } }]);
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
