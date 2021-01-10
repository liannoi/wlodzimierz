import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ApplicationPaths} from './shared/app.constants';
import {HomeComponent} from './core/home/home.component';
import {AppsComponent} from './core/apps/apps.component';
import {FeedbackComponent} from './core/feedback/feedback.component';

const routes: Routes = [
  {path: ApplicationPaths.Home, component: HomeComponent, pathMatch: 'full'},
  {path: ApplicationPaths.Feedback, component: FeedbackComponent},
  {path: ApplicationPaths.Apps, component: AppsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
