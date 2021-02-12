import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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

@NgModule({
  imports: [
    CommonModule,
    StorageModule,
    UsersRoutingModule,
    StoreModule.forFeature(fromUsers.USERS_FEATURE_KEY, fromUsers.reducer),
    EffectsModule.forFeature([UsersEffects])
  ],
  declarations: [SignInComponent, SignUpComponent, SignOutComponent],
  providers: [UsersFacade, AuthService, UsersEndpointBuilder, JwtTokenService]
})
export class UsersModule {
}
