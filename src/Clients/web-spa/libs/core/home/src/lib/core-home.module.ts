import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreHomeComponent } from './home.component';
import { CoreHomeRoutingModule } from './home-routing.module';
import { AppsComponent } from './apps/apps.component';
import { FeedbackComponent } from './feedback/feedback.component';

@NgModule({
  imports: [CommonModule, CoreHomeRoutingModule],
  declarations: [CoreHomeComponent, AppsComponent, FeedbackComponent]
})
export class CoreHomeModule {
}
