import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeRoutingConstants} from './home-routing.constants';
import {HomeComponent} from './home.component';
import {AppsComponent} from './apps/apps.component';
import {FeedbackComponent} from './feedback/feedback.component';

const routes: Routes = [
  {path: HomeRoutingConstants.Root, component: HomeComponent},
  {path: HomeRoutingConstants.Apps, component: AppsComponent},
  {path: HomeRoutingConstants.Feedback, component: FeedbackComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
