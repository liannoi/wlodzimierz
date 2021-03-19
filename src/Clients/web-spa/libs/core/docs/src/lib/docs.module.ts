import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocsApiComponent } from './docs-api/docs-api.component';
import { DocsComponent } from './docs.component';
import { DocsRoutingModule } from './docs-routing.module';

@NgModule({
  imports: [CommonModule, DocsRoutingModule],
  declarations: [DocsApiComponent, DocsComponent]
})
export class DocsModule {
}
