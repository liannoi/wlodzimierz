import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FeedbackComponent } from '@wlodzimierz/presentation/feedback/src/lib/feedback.component';

const routes: Routes = [
  { path: '', component: FeedbackComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class FeedbackRoutingModule {
}
