import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocsComponent } from './docs.component';
import { DocsRoutingModule } from './docs-routing.module';
import { DocsApiComponent } from './docs-api/docs-api.component';

@NgModule({
  imports: [CommonModule, DocsRoutingModule],
  declarations: [DocsComponent, DocsApiComponent]
})
export class DocsModule {
}
