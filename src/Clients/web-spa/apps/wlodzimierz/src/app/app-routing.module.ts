import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@wlodzimierz/core/home').then((m) => m.HomeModule)
  },
  {
    path: 'docs',
    loadChildren: () =>
      import('@wlodzimierz/core/docs').then((m) => m.DocsModule)
  },
  {
    path: 'app',
    loadChildren: () =>
      import('@wlodzimierz/app/chat').then((m) => m.ChatModule)
  },
  {
    path: '**',
    loadChildren: () =>
      import('@wlodzimierz/core/statuses').then((m) => m.StatusesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
