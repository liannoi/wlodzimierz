import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {NavTopMenuComponent} from './nav-top-menu/nav-top-menu.component';
import {NavFooterComponent} from './nav-footer/nav-footer.component';

@NgModule({
  declarations: [
    NavTopMenuComponent,
    NavFooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  exports: [
    NavTopMenuComponent,
    NavFooterComponent,
    NgbModule
  ]
})
export class LayoutModule {
}
