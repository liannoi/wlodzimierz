import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { AppsComponent } from './apps/apps.component';
import { HomeRoutingModule } from './home-routing.module';
import { FeedbackComponent } from './feedback/feedback.component';

@NgModule({
  imports: [CommonModule, HomeRoutingModule],
  declarations: [HomeComponent, AppsComponent, FeedbackComponent],
})
export class HomeModule {}
