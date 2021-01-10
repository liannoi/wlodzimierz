import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {WebRoutingModule} from './web-routing.module';
import {WebAppComponent} from './web-app/web-app.component';

@NgModule({
  declarations: [
    WebAppComponent
  ],
  imports: [
    CommonModule,
    WebRoutingModule
  ],
})
export class WebModule {
}
