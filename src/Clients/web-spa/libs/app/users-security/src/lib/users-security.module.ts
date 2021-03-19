import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QRCodeModule } from 'angularx-qrcode';

import { IntroComponent } from './intro/intro.component';
import { UsersSecurityRoutingModule } from './users-security-routing.module';
import { VerifyComponent } from './verify/verify.component';
import { RecoveryCodesComponent } from './recovery-codes/recovery-codes.component';
import { UsersSecurityService } from './shared/storage/users-security.service';
import { UsersSecurityEndpointBuilder } from './shared/storage/users-security-endpoint.builder';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    QRCodeModule,
    FontAwesomeModule,
    NgbModule,
    UsersSecurityRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [IntroComponent, VerifyComponent, RecoveryCodesComponent],
  providers: [UsersSecurityService, UsersSecurityEndpointBuilder]
})
export class UsersSecurityModule {
}
