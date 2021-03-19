import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { SecurityComponent } from './security/security.component';
import { AppearanceComponent } from './appearance/appearance.component';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { JwtTokenGuard } from '../../../../app/users/src/lib/shared/guards/jwt-token.guard';

const routes: Routes = [
  { path: '', component: AppearanceComponent, canActivate: [JwtTokenGuard] },
  {
    path: 'security',
    component: SecurityComponent,
    canActivate: [JwtTokenGuard]
  },
  {
    path: 'two_factor_authentication',
    loadChildren: () =>
      import('@wlodzimierz/app/users-security').then(
        (m) => m.UsersSecurityModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {
}
