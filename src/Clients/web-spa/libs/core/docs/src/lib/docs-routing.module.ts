import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DocsComponent } from './docs.component';
import { DocsApiComponent } from './docs-api/docs-api.component';

const routes: Routes = [
  { path: '', component: DocsComponent },
  { path: 'api', component: DocsApiComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class DocsRoutingModule {
}
