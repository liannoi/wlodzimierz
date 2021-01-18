import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthRoutingConstants} from './auth-routing.constants';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {SignOutComponent} from './sign-out/sign-out.component';

const routes: Routes = [
  {path: AuthRoutingConstants.SignIn, component: SignInComponent},
  {path: AuthRoutingConstants.SignUp, component: SignUpComponent},
  {path: AuthRoutingConstants.SignOut, component: SignOutComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
