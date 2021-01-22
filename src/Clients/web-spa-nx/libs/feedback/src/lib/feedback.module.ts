import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackRoutingModule } from '@wlodzimierz/feedback/src/lib/feedback-routing.module';
import { FeedbackComponent } from '@wlodzimierz/feedback/src/lib/feedback.component';

@NgModule({
  imports: [CommonModule, FeedbackRoutingModule],
  declarations: [FeedbackComponent]
})
export class FeedbackModule {
}
