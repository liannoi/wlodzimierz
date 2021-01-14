import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthModule} from './auth/auth.module';
import {HomeComponent} from './core/home/home.component';
import {AppsComponent} from './core/apps/apps.component';
import {FeedbackComponent} from './core/feedback/feedback.component';
import {WebModule} from './web/web.module';
import {NavModule} from './nav/nav.module';
import {DocsModule} from './docs/docs.module';
import {StatusesModule} from './statuses/statuses.module';

@NgModule({
  declarations: [
    AppComponent,
    AppsComponent,
    FeedbackComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavModule,
    DocsModule,
    AuthModule,
    WebModule,
    NgbModule,
    StatusesModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
