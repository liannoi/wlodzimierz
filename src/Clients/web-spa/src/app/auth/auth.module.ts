import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {CookieService} from 'ngx-cookie-service';

import {SignOutComponent} from './sign-out/sign-out.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {AuthRoutingModule} from './auth-routing.module';
import {AuthService} from './shared/services/auth.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    SignOutComponent,
    SignInComponent,
    SignUpComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthRoutingModule,
  ],
  providers: [
    AuthService,
    CookieService,
  ]
})
export class AuthModule {
}
