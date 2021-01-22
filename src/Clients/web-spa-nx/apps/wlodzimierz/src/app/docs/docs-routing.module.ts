import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DocsRouting } from './docs.routing';
import { DocsComponent } from './docs.component';
import { DocsApiComponent } from './docs-api/docs-api.component';


const routes: Routes = [
  { path: DocsRouting.Root, component: DocsComponent },
  { path: DocsRouting.Api, component: DocsApiComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class DocsRoutingModule {
}
