/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { BecodapoeirashopTestModule } from '../../../test.module';
import { VendasUpdateComponent } from 'app/entities/vendas/vendas-update.component';
import { VendasService } from 'app/entities/vendas/vendas.service';
import { Vendas } from 'app/shared/model/vendas.model';

describe('Component Tests', () => {
  describe('Vendas Management Update Component', () => {
    let comp: VendasUpdateComponent;
    let fixture: ComponentFixture<VendasUpdateComponent>;
    let service: VendasService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BecodapoeirashopTestModule],
        declarations: [VendasUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(VendasUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VendasUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VendasService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Vendas(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Vendas();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
