import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { JwtTokenGuard } from '../../../users/src/lib/shared/guards/jwt-token.guard';
import { IntroComponent } from './intro/intro.component';
import { VerifyComponent } from './verify/verify.component';
import { RecoveryCodesComponent } from './recovery-codes/recovery-codes.component';

const routes: Routes = [
  { path: '', component: IntroComponent, canActivate: [JwtTokenGuard] },
  {
    path: 'recovery_codes',
    component: RecoveryCodesComponent,
    canActivate: [JwtTokenGuard]
  },
  { path: 'verify', component: VerifyComponent, canActivate: [JwtTokenGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersSecurityRoutingModule {
}
