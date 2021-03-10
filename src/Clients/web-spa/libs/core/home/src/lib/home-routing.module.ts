import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { AppsComponent } from './apps/apps.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'apps', component: AppsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class HomeRoutingModule {
}
