import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from '@wlodzimierz/presentation/auth/src/lib/auth-routing.module';
import { SignInComponent } from '@wlodzimierz/presentation/auth/src/lib/sign-in/sign-in.component';
import { SignUpComponent } from '@wlodzimierz/presentation/auth/src/lib/sign-up/sign-up.component';
import { SignOutComponent } from '@wlodzimierz/presentation/auth/src/lib/sign-out/sign-out.component';

@NgModule({
  imports: [CommonModule, AuthRoutingModule],
  declarations: [SignInComponent, SignUpComponent, SignOutComponent]
})
export class AuthModule {
}
