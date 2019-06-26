import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVendedor } from 'app/shared/model/vendedor.model';
import { VendedorService } from './vendedor.service';

@Component({
  selector: 'jhi-vendedor-delete-dialog',
  templateUrl: './vendedor-delete-dialog.component.html'
})
export class VendedorDeleteDialogComponent {
  vendedor: IVendedor;

  constructor(protected vendedorService: VendedorService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.vendedorService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'vendedorListModification',
        content: 'Deleted an vendedor'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-vendedor-delete-popup',
  template: ''
})
export class VendedorDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ vendedor }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(VendedorDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.vendedor = vendedor;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/vendedor', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/vendedor', { outlets: { popup: null } }]);
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
