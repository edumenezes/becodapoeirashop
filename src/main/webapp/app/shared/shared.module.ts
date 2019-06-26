import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BecodapoeirashopSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [BecodapoeirashopSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [BecodapoeirashopSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BecodapoeirashopSharedModule {
  static forRoot() {
    return {
      ngModule: BecodapoeirashopSharedModule
    };
  }
}
