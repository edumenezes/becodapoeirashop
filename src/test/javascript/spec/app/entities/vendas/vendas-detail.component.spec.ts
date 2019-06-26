/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BecodapoeirashopTestModule } from '../../../test.module';
import { VendasDetailComponent } from 'app/entities/vendas/vendas-detail.component';
import { Vendas } from 'app/shared/model/vendas.model';

describe('Component Tests', () => {
  describe('Vendas Management Detail Component', () => {
    let comp: VendasDetailComponent;
    let fixture: ComponentFixture<VendasDetailComponent>;
    const route = ({ data: of({ vendas: new Vendas(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BecodapoeirashopTestModule],
        declarations: [VendasDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(VendasDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(VendasDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.vendas).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
