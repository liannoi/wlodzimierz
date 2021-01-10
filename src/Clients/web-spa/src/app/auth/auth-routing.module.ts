import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthenticationPaths} from './shared/auth.constants';
import {SignUpComponent} from './sign-up/sign-up.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignOutComponent} from './sign-out/sign-out.component';

const routes: Routes = [
  {path: AuthenticationPaths.SignUp, component: SignUpComponent},
  {path: AuthenticationPaths.SignIn, component: SignInComponent},
  {path: AuthenticationPaths.SignOut, component: SignOutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
