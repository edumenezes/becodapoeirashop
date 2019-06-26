import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BecodapoeirashopSharedModule } from 'app/shared';
import {
  VendasComponent,
  VendasDetailComponent,
  VendasUpdateComponent,
  VendasDeletePopupComponent,
  VendasDeleteDialogComponent,
  vendasRoute,
  vendasPopupRoute
} from './';

const ENTITY_STATES = [...vendasRoute, ...vendasPopupRoute];

@NgModule({
  imports: [BecodapoeirashopSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [VendasComponent, VendasDetailComponent, VendasUpdateComponent, VendasDeleteDialogComponent, VendasDeletePopupComponent],
  entryComponents: [VendasComponent, VendasUpdateComponent, VendasDeleteDialogComponent, VendasDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BecodapoeirashopVendasModule {}
