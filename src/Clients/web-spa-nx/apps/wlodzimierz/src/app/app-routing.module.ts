import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('@wlodzimierz/home').then(module => module.HomeModule) },
  { path: 'feedback', loadChildren: () => import('@wlodzimierz/feedback').then(module => module.FeedbackModule) },
  { path: 'apps', loadChildren: () => import('@wlodzimierz/applications').then(module => module.ApplicationsModule) },
  { path: 'docs', loadChildren: () => import('@wlodzimierz/docs').then(module => module.DocsModule) },
  { path: 'docs/api', loadChildren: () => import('@wlodzimierz/docs-api').then(module => module.DocsApiModule) },
  { path: 'app', loadChildren: () => import('@wlodzimierz/chat').then(module => module.ChatModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
