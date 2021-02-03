import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { TopMenuComponent } from './layout/top-menu/top-menu.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent, TopMenuComponent, FooterComponent],
  imports: [BrowserModule, NgbModule, AppRoutingModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}
