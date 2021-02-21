import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedStorageModule } from '@wlodzimierz/shared/storage';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { AppUsersRoutingModule } from './users-routing.module';
import * as fromUsers from './+state/users.reducer';
import { AppUsersEffects } from './+state/users.effects';
import { AppUsersFacade } from './+state/users.facade';
import { AuthService } from './shared/storage/services/auth.service';
import { AppUsersEndpointBuilder } from './shared/storage/users-endpoint.builder';
import { JwtTokenService } from './shared/storage/services/jwt-token.service';
import { AuthFormFacade } from './shared/storage/forms/auth-form.facade';
import { AppUsersService } from './shared/storage/services/users.service';
import { JwtTokenGuard } from './shared/guards/jwt-token.guard';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedStorageModule,
    AppUsersRoutingModule,
    StoreModule.forFeature(fromUsers.USERS_FEATURE_KEY, fromUsers.reducer),
    EffectsModule.forFeature([AppUsersEffects])
  ],
  declarations: [SignInComponent, SignUpComponent, SignOutComponent],
  providers: [
    AppUsersFacade,
    AuthService,
    AppUsersEndpointBuilder,
    JwtTokenService,
    AuthFormFacade,
    AppUsersService,
    JwtTokenGuard
  ]
})
export class AppUsersModule {
}
