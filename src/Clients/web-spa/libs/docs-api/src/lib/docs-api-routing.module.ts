import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DocsApiComponent } from './docs-api.component';

const routes: Routes = [
  { path: '', component: DocsApiComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class DocsApiRoutingModule {
}
