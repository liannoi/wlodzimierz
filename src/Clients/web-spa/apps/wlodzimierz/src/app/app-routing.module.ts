import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('@wlodzimierz/home').then(m => m.HomeModule) },
  { path: 'feedback', loadChildren: () => import('@wlodzimierz/feedback').then(m => m.FeedbackModule) },
  { path: 'apps', loadChildren: () => import('@wlodzimierz/software').then(m => m.SoftwareModule) },
  { path: 'docs', loadChildren: () => import('@wlodzimierz/docs').then(m => m.DocsModule) },
  { path: 'docs/api', loadChildren: () => import('@wlodzimierz/docs-api').then(m => m.DocsApiModule) },
  { path: '**', loadChildren: () => import('@wlodzimierz/status-not-found').then(m => m.StatusNotFoundModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
