import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUsuarioRolCd } from 'app/shared/model/usuario-rol-cd.model';
import { UsuarioRolCdService } from './usuario-rol-cd.service';

@Component({
    selector: '-usuario-rol-cd-delete-dialog',
    templateUrl: './usuario-rol-cd-delete-dialog.component.html'
})
export class UsuarioRolCdDeleteDialogComponent {
    usuarioRol: IUsuarioRolCd;

    constructor(
        protected usuarioRolService: UsuarioRolCdService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.usuarioRolService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'usuarioRolListModification',
                content: 'Deleted an usuarioRol'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: '-usuario-rol-cd-delete-popup',
    template: ''
})
export class UsuarioRolCdDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ usuarioRol }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(UsuarioRolCdDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.usuarioRol = usuarioRol;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/usuario-rol-cd', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/usuario-rol-cd', { outlets: { popup: null } }]);
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
