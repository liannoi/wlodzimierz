import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavFooterComponent} from './shared/nav-footer/nav-footer.component';
import {NavTopMenuComponent} from './shared/nav-top-menu/nav-top-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    NavTopMenuComponent,
    NavFooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
