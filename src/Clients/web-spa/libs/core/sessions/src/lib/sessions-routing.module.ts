import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TwoFactorComponent } from './two-factor/two-factor.component';

const routes: Routes = [{ path: 'two-factor', component: TwoFactorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class SessionsRoutingModule {
}
