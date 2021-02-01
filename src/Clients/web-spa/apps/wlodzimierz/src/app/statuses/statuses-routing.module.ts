import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StatusNotFoundComponent } from './status-not-found/status-not-found.component';

const routes: Routes = [
  { path: '**', component: StatusNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class StatusesRoutingModule {
}
