import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocsComponent } from './docs.component';
import { DocsApiComponent } from './docs-api/docs-api.component';
import { DocsRoutingModule } from './docs-routing.module';

@NgModule({
  declarations: [DocsComponent, DocsApiComponent],
  imports: [CommonModule, DocsRoutingModule]
})
export class DocsModule {
}
