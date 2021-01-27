import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { InfrastructureModule } from '@wlodzimierz/infrastructure';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [SignInComponent, SignUpComponent, SignOutComponent],
  imports: [CommonModule, ReactiveFormsModule, InfrastructureModule, AuthRoutingModule]
})
export class AuthModule {
}
