import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { StorageModule } from '@wlodzimierz/shared/storage';

import * as fromUsers from './+state/users.reducer';
import { UsersFacade } from './+state/users.facade';
import { UsersEffects } from './+state/users.effects';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UsersRoutingModule } from './users-routing.module';
import { JwtTokenGuard } from './shared/guards/jwt-token.guard';
import { SignOutComponent } from './sign-out/sign-out.component';
import { AuthService } from './shared/storage/services/auth.service';
import { AuthFormFacade } from './shared/storage/form/auth-form.facade';
import { JwtTokenService } from './shared/storage/services/jwt-token.service';
import { UsersEndpointBuilder } from './shared/storage/users-endpoint.builder';

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
  providers: [
    UsersFacade,
    AuthService,
    UsersEndpointBuilder,
    JwtTokenService,
    AuthFormFacade,
    JwtTokenGuard
  ]
})
export class UsersModule {
}
