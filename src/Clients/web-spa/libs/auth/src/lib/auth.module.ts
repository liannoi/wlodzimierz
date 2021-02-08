import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthFacade } from '@wlodzimierz/auth';

import { AuthRoutingModule } from './auth-routing.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import * as fromAuth from './+state/auth.reducer';
import { AuthEffects } from './+state/auth.effects';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthService } from './shared/services/auth.service';
import { UsersEndpointBuilder } from './shared/builders/users-endpoint.builder';
import { JwtTokenService } from './shared/services/jwt-token.service';
import { AuthFormService } from './shared/services/auth-form.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    StoreModule.forFeature(fromAuth.AUTH_FEATURE_KEY, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [SignInComponent, SignUpComponent, SignOutComponent],
  providers: [AuthFacade, AuthService, UsersEndpointBuilder, JwtTokenService, AuthFormService]
})
export class AuthModule {
}
