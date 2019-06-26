/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BecodapoeirashopTestModule } from '../../../test.module';
import { VendasDeleteDialogComponent } from 'app/entities/vendas/vendas-delete-dialog.component';
import { VendasService } from 'app/entities/vendas/vendas.service';

describe('Component Tests', () => {
  describe('Vendas Management Delete Component', () => {
    let comp: VendasDeleteDialogComponent;
    let fixture: ComponentFixture<VendasDeleteDialogComponent>;
    let service: VendasService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BecodapoeirashopTestModule],
        declarations: [VendasDeleteDialogComponent]
      })
        .overrideTemplate(VendasDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(VendasDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VendasService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
