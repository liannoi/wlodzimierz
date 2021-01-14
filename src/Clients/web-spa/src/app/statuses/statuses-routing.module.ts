import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {StatusesPaths} from './shared/statuses.constants';
import {NotFoundComponent} from './not-found/not-found.component';

const routes: Routes = [
  {path: StatusesPaths.NotFound, component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatusesRoutingModule {
}
