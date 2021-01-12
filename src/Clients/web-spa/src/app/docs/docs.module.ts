import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DocsComponent} from './docs.component';
import {DocsRoutingModule} from './docs-routing.module';
import {ApiComponent} from './api/api.component';

@NgModule({
  declarations: [
    DocsComponent,
    ApiComponent
  ],
  imports: [
    CommonModule,
    DocsRoutingModule
  ]
})
export class DocsModule {
}
