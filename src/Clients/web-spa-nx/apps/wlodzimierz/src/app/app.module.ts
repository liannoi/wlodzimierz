import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavTopMenuComponent } from './layout/nav-top-menu/nav-top-menu.component';
import { NavFooterComponent } from './layout/nav-footer/nav-footer.component';
import { HomeModule } from './home/home.module';
import { DocsModule } from './docs/docs.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';

@NgModule({
  declarations: [AppComponent, NavTopMenuComponent, NavFooterComponent],
  imports: [BrowserModule, NgbModule, HomeModule, DocsModule, AuthModule, ChatModule, AppRoutingModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}
