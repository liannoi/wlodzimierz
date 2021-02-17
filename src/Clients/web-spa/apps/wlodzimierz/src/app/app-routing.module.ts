import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('@wlodzimierz/home').then(m => m.HomeModule) },
  { path: 'docs', loadChildren: () => import('@wlodzimierz/docs').then(m => m.DocsModule) },
  { path: 'app', loadChildren: () => import('@wlodzimierz/chat').then(m => m.ChatModule) },
  { path: '**', loadChildren: () => import('@wlodzimierz/statuses').then(m => m.StatusesModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
