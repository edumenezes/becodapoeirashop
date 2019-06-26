import { NgModule } from '@angular/core';

import { BecodapoeirashopSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [BecodapoeirashopSharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [BecodapoeirashopSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class BecodapoeirashopSharedCommonModule {}
