import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavTopMenuComponent } from './layout/nav-top-menu/nav-top-menu.component';
import { NavFooterComponent } from './layout/nav-footer/nav-footer.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent, NavTopMenuComponent, NavFooterComponent],
  imports: [BrowserModule, AppRoutingModule, NgbModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}
