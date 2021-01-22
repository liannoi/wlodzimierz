import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApplicationsComponent } from '@wlodzimierz/applications/src/lib/applications.component';

const routes: Routes = [
  { path: '', component: ApplicationsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class ApplicationsRoutingModule {
}
