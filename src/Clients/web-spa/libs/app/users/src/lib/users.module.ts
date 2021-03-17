import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
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
import { UsersService } from './shared/storage/services/users.service';
import { SettingsComponent } from './settings/settings.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StorageModule,
    UsersRoutingModule,
    StoreModule.forFeature(fromUsers.USERS_FEATURE_KEY, fromUsers.reducer),
    EffectsModule.forFeature([UsersEffects]),
    FontAwesomeModule,
    NgbModule
  ],
  declarations: [
    SignInComponent,
    SignUpComponent,
    SignOutComponent,
    SettingsComponent
  ],
  providers: [
    UsersFacade,
    AuthService,
    UsersEndpointBuilder,
    JwtTokenService,
    AuthFormFacade,
    JwtTokenGuard,
    UsersService
  ]
})
export class UsersModule {
}
