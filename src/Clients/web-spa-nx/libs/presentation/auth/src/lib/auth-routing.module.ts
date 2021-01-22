import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInCommand } from 'libs/data/src/lib/storage/users/commands/sign-in.command';
import { SignUpComponent } from 'src/lib/sign-up/sign-up.component';
import { SignOutComponent } from 'src/lib/sign-out/sign-out.component';

const routes: Routes = [
  { path: 'sign-in', component: SignInCommand },
  { path: 'signup', component: SignUpComponent },
  { path: 'sign-out', component: SignOutComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class AuthRoutingModule {
}
