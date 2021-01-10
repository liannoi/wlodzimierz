import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ApplicationPaths} from './shared/app.constants';
import {HomeComponent} from './core/home/home.component';
import {DocsComponent} from './core/docs/docs.component';
import {AppsComponent} from './core/apps/apps.component';
import {FeedbackComponent} from './core/feedback/feedback.component';
import {ApiComponent} from './core/api/api.component';

const routes: Routes = [
  {path: ApplicationPaths.Home, component: HomeComponent, pathMatch: 'full'},
  {path: ApplicationPaths.Docs, component: DocsComponent},
  {path: ApplicationPaths.Apps, component: AppsComponent},
  {path: ApplicationPaths.Feedback, component: FeedbackComponent},
  {path: ApplicationPaths.Api, component: ApiComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
