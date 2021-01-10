import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DocsComponent} from './docs.component';
import {DocsRoutingModule} from './docs-routing.module';

@NgModule({
  declarations: [
    DocsComponent
  ],
  imports: [
    CommonModule,
    DocsRoutingModule
  ]
})
export class DocsModule {
}
