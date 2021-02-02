import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsProfileComponent } from './settings-profile/settings-profile.component';
import { SettingsComponent } from './settings.component';
import { SettingsPasswordComponent } from './settings-password/settings-password.component';

@NgModule({
  declarations: [SettingsProfileComponent, SettingsComponent, SettingsPasswordComponent],
  imports: [CommonModule, ReactiveFormsModule,SettingsRoutingModule ]
})
export class SettingsModule {
}
