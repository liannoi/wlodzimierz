import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavFooterComponent} from './core/nav-footer/nav-footer.component';
import {NavTopMenuComponent} from './core/nav-top-menu/nav-top-menu.component';
import {AuthModule} from './auth/auth.module';
import {HomeComponent} from './core/home/home.component';
import { DocsComponent } from './core/docs/docs.component';
import { AppsComponent } from './core/apps/apps.component';
import { FeedbackComponent } from './core/feedback/feedback.component';
import { ApiComponent } from './core/api/api.component';

@NgModule({
  declarations: [
    AppComponent,
    NavTopMenuComponent,
    NavFooterComponent,
    HomeComponent,
    DocsComponent,
    AppsComponent,
    FeedbackComponent,
    ApiComponent,
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
