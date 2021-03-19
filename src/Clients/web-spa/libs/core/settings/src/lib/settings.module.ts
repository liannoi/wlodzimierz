import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UsersSecurityModule } from '@wlodzimierz/app/users-security';

import { SecurityComponent } from './security/security.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { AppearanceComponent } from './appearance/appearance.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FontAwesomeModule,
    SettingsRoutingModule,
    UsersSecurityModule
  ],
  declarations: [AppearanceComponent, SecurityComponent]
})
export class SettingsModule {
}
