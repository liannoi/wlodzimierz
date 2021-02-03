import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocsApiComponent } from './docs-api.component';
import { DocsApiRoutingModule } from './docs-api-routing.module';

@NgModule({
  imports: [CommonModule, DocsApiRoutingModule],
  declarations: [DocsApiComponent]
})
export class DocsApiModule {
}
