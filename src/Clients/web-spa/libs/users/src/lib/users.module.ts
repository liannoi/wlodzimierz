import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { StorageModule } from '@wlodzimierz/storage';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { UsersRoutingModule } from './users-routing.module';
import * as fromUsers from './+state/users.reducer';
import { UsersEffects } from './+state/users.effects';
import { UsersFacade } from './+state/users.facade';
import { AuthService } from './shared/services/auth.service';
import { UsersEndpointBuilder } from './shared/builders/users-endpoint.builder';
import { JwtTokenService } from './shared/services/jwt-token.service';
import { AuthFormFacade } from './shared/forms/auth-form.facade';
import { UsersService } from './shared/services/users.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StorageModule,
    UsersRoutingModule,
    StoreModule.forFeature(fromUsers.USERS_FEATURE_KEY, fromUsers.reducer),
    EffectsModule.forFeature([UsersEffects])
  ],
  declarations: [SignInComponent, SignUpComponent, SignOutComponent],
  providers: [UsersFacade, AuthService, UsersEndpointBuilder, JwtTokenService, AuthFormFacade, UsersService]
})
export class UsersModule {
}
