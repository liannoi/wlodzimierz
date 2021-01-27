import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthRouting } from './auth.routing';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignOutComponent } from './sign-out/sign-out.component';

const routes: Routes = [
  { path: AuthRouting.SignIn, component: SignInComponent },
  { path: AuthRouting.SignUp, component: SignUpComponent },
  { path: AuthRouting.SignOut, component: SignOutComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
