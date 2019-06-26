import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'vendedor',
        loadChildren: './vendedor/vendedor.module#BecodapoeirashopVendedorModule'
      },
      {
        path: 'vendas',
        loadChildren: './vendas/vendas.module#BecodapoeirashopVendasModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BecodapoeirashopEntityModule {}
