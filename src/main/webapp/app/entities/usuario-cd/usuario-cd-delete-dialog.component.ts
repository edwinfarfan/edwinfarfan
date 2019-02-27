import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUsuarioCd } from 'app/shared/model/usuario-cd.model';
import { UsuarioCdService } from './usuario-cd.service';

@Component({
    selector: '-usuario-cd-delete-dialog',
    templateUrl: './usuario-cd-delete-dialog.component.html'
})
export class UsuarioCdDeleteDialogComponent {
    usuario: IUsuarioCd;

    constructor(protected usuarioService: UsuarioCdService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.usuarioService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'usuarioListModification',
                content: 'Deleted an usuario'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: '-usuario-cd-delete-popup',
    template: ''
})
export class UsuarioCdDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ usuario }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(UsuarioCdDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.usuario = usuario;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/usuario-cd', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/usuario-cd', { outlets: { popup: null } }]);
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
