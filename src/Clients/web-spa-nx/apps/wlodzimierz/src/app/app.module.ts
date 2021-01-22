import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavTopMenuComponent } from './layout/nav-top-menu/nav-top-menu.component';
import { NavFooterComponent } from './layout/nav-footer/nav-footer.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, NavTopMenuComponent, NavFooterComponent],
  imports: [BrowserModule, AppRoutingModule, NgbModule],
  providers: [{ provide: 'api_url', useValue: environment.api_url }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
