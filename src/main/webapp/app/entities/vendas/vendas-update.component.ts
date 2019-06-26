import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IVendas, Vendas } from 'app/shared/model/vendas.model';
import { VendasService } from './vendas.service';
import { IVendedor } from 'app/shared/model/vendedor.model';
import { VendedorService } from 'app/entities/vendedor';

@Component({
  selector: 'jhi-vendas-update',
  templateUrl: './vendas-update.component.html'
})
export class VendasUpdateComponent implements OnInit {
  isSaving: boolean;

  vendedors: IVendedor[];

  editForm = this.fb.group({
    id: [],
    countryName: [],
    vendedor: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected vendasService: VendasService,
    protected vendedorService: VendedorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ vendas }) => {
      this.updateForm(vendas);
    });
    this.vendedorService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IVendedor[]>) => mayBeOk.ok),
        map((response: HttpResponse<IVendedor[]>) => response.body)
      )
      .subscribe((res: IVendedor[]) => (this.vendedors = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(vendas: IVendas) {
    this.editForm.patchValue({
      id: vendas.id,
      countryName: vendas.countryName,
      vendedor: vendas.vendedor
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const vendas = this.createFromForm();
    if (vendas.id !== undefined) {
      this.subscribeToSaveResponse(this.vendasService.update(vendas));
    } else {
      this.subscribeToSaveResponse(this.vendasService.create(vendas));
    }
  }

  private createFromForm(): IVendas {
    return {
      ...new Vendas(),
      id: this.editForm.get(['id']).value,
      countryName: this.editForm.get(['countryName']).value,
      vendedor: this.editForm.get(['vendedor']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVendas>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackVendedorById(index: number, item: IVendedor) {
    return item.id;
  }
}
