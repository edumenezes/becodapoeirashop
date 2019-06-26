import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVendas } from 'app/shared/model/vendas.model';

@Component({
  selector: 'jhi-vendas-detail',
  templateUrl: './vendas-detail.component.html'
})
export class VendasDetailComponent implements OnInit {
  vendas: IVendas;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ vendas }) => {
      this.vendas = vendas;
    });
  }

  previousState() {
    window.history.back();
  }
}
