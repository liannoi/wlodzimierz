import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@wlodzimierz/core/home').then((m) => m.CoreHomeModule)
  },
  {
    path: 'docs',
    loadChildren: () =>
      import('@wlodzimierz/core/docs').then((m) => m.CoreDocsModule)
  },
  {
    path: 'app',
    loadChildren: () =>
      import('@wlodzimierz/app/chat').then((m) => m.AppChatModule)
  },
  {
    path: '**',
    loadChildren: () =>
      import('@wlodzimierz/core/statuses').then((m) => m.CoreStatusesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
