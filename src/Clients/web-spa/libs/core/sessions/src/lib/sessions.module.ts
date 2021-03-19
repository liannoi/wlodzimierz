import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UsersSecurityModule } from '@wlodzimierz/app/users-security';

import { SessionsRoutingModule } from './sessions-routing.module';
import { TwoFactorComponent } from './two-factor/two-factor.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    SessionsRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    UsersSecurityModule
  ],
  declarations: [TwoFactorComponent]
})
export class SessionsModule {
}
