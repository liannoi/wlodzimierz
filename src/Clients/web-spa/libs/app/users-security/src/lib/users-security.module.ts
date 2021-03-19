import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QRCodeModule } from 'angularx-qrcode';

import { IntroComponent } from './intro/intro.component';
import { UsersSecurityRoutingModule } from './users-security-routing.module';
import { VerifyComponent } from './verify/verify.component';
import { RecoveryCodesComponent } from './recovery-codes/recovery-codes.component';

@NgModule({
  imports: [
    CommonModule,
    QRCodeModule,
    FontAwesomeModule,
    NgbModule,
    UsersSecurityRoutingModule,
  ],
  declarations: [IntroComponent, VerifyComponent, RecoveryCodesComponent],
})
export class UsersSecurityModule {}
