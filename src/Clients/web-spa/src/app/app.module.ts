import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavFooterComponent} from './core/nav-footer/nav-footer.component';
import {NavTopMenuComponent} from './core/nav-top-menu/nav-top-menu.component';
import {AuthModule} from './auth/auth.module';
import {HomeComponent} from './core/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavTopMenuComponent,
    NavFooterComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AuthModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
