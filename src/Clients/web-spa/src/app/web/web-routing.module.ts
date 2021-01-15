import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {WebPaths} from './shared/web.constants';
import {WebAppComponent} from './web-app.component';

const routes: Routes = [
  {path: WebPaths.App, component: WebAppComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule {
}
