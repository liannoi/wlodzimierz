import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {NavigationModule} from './shared/navigation/navigation.module';
import {PresentationRoutingModule} from './presentation-routing.module';
import {PresentationComponent} from './presentation.component';
import {HomeComponent} from './shared/home/home.component';
import {FeedbackComponent} from './shared/feedback/feedback.component';
import {AppsComponent} from './shared/docs/apps/apps.component';
import {DocsComponent} from './shared/docs/docs.component';
import {AppComponent} from './shared/app/app.component';

@NgModule({
  declarations: [
    PresentationComponent,
    HomeComponent,
    FeedbackComponent,
    AppsComponent,
    DocsComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    PresentationRoutingModule,
    NavigationModule,
  ],
  bootstrap: [PresentationComponent]
})
export class PresentationModule {
}
