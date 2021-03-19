import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SecurityComponent } from './security/security.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { AppearanceComponent } from './appearance/appearance.component';

@NgModule({
  imports: [CommonModule, NgbModule, FontAwesomeModule, SettingsRoutingModule],
  declarations: [AppearanceComponent, SecurityComponent],
})
export class SettingsModule {}
