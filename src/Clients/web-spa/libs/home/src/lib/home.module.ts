import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { FeedbackComponent } from './feedback/feedback.component';
import { SoftwareComponent } from './software/software.component';

@NgModule({
  imports: [CommonModule, HomeRoutingModule],
  declarations: [HomeComponent, FeedbackComponent, SoftwareComponent]
})
export class HomeModule {
}
