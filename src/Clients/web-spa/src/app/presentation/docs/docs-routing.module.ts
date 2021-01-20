import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DocsComponent} from './docs.component';
import {DocsApiComponent} from './docs-api/docs-api.component';
import {DocsRoutingConstants} from './docs-routing.constants';

const routes: Routes = [
  {path: DocsRoutingConstants.Root, component: DocsComponent},
  {path: DocsRoutingConstants.Api, component: DocsApiComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocsRoutingModule {
}
