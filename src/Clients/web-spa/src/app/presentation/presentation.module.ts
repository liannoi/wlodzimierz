import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {NavigationModule} from './shared/navigation/navigation.module';
import {PresentationRoutingModule} from './presentation-routing.module';
import {PresentationComponent} from './presentation.component';
import {HomeComponent} from './shared/home/home.component';

@NgModule({
  declarations: [
    PresentationComponent,
    HomeComponent
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
