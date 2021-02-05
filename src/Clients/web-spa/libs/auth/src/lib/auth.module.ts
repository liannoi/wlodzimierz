import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SignInComponent } from './sign-in/sign-in.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { UsersStore } from './shared/stores/users.store';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule],
  declarations: [SignInComponent, SignUpComponent, SignOutComponent],
  providers: [UsersStore]
})
export class AuthModule {
}
