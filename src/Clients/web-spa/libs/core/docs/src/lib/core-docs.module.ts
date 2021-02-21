import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreDocsApiComponent } from './docs-api/docs-api.component';
import { CoreDocsComponent } from './docs.component';
import { CoreDocsRoutingModule } from './docs-routing.module';

@NgModule({
  imports: [CommonModule, CoreDocsRoutingModule],
  declarations: [CoreDocsApiComponent, CoreDocsComponent]
})
export class CoreDocsModule {
}
