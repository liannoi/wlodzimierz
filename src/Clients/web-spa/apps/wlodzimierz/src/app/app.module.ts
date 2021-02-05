import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthModule } from '@wlodzimierz/auth';

import { AppComponent } from './app.component';
import { TopMenuComponent } from './layout/top-menu/top-menu.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [AppComponent, TopMenuComponent, FooterComponent],
  imports: [BrowserModule, NgbModule, AuthModule, AppRoutingModule, StoreModule.forRoot({}, {})],
  bootstrap: [AppComponent]
})
export class AppModule {
}
