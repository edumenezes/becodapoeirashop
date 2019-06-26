import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVendas } from 'app/shared/model/vendas.model';
import { VendasService } from './vendas.service';

@Component({
  selector: 'jhi-vendas-delete-dialog',
  templateUrl: './vendas-delete-dialog.component.html'
})
export class VendasDeleteDialogComponent {
  vendas: IVendas;

  constructor(protected vendasService: VendasService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.vendasService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'vendasListModification',
        content: 'Deleted an vendas'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-vendas-delete-popup',
  template: ''
})
export class VendasDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ vendas }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(VendasDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.vendas = vendas;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/vendas', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/vendas', { outlets: { popup: null } }]);
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
