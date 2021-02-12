import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TopMenuComponent } from './layout/top-menu/top-menu.component';
import { FooterComponent } from './layout/footer/footer.component';

@NgModule({
  imports: [BrowserModule, NgbModule, AppRoutingModule],
  declarations: [AppComponent, TopMenuComponent, FooterComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
