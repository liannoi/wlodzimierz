import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {FooterComponent} from './footer/footer.component';
import {TopMenuComponent} from './top-menu/top-menu.component';

@NgModule({
  declarations: [
    FooterComponent,
    TopMenuComponent
  ],
  exports: [
    TopMenuComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ]
})
export class NavModule {
}
