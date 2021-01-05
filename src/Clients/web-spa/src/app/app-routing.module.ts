import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './core/home/home.component';
import {ApplicationPaths} from './shared/app.constants';

const routes: Routes = [
  {path: ApplicationPaths.Home, component: HomeComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
