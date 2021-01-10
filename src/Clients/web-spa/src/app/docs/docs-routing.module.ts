import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DocsPaths} from './shared/docs.constants';
import {DocsComponent} from './docs.component';
import {ApiComponent} from './api/api.component';

const routes: Routes = [
  {path: DocsPaths.Root, component: DocsComponent},
  {path: DocsPaths.Api, component: ApiComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DocsRoutingModule {
}
