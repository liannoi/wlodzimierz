import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FeedbackComponent } from './feedback/feedback.component';
import { AppsComponent } from './apps/apps.component';
import { HomeComponent } from './home.component';
import { HomeRouting } from './home.routing';

const routes: Routes = [
  { path: HomeRouting.Root, component: HomeComponent },
  { path: HomeRouting.Apps, component: AppsComponent },
  { path: HomeRouting.Feedback, component: FeedbackComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class HomeRoutingModule {
}
