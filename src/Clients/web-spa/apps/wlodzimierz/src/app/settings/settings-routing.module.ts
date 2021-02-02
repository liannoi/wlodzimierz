import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingsRouting } from './settings.routing';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  { path: SettingsRouting.Root, component: SettingsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class SettingsRoutingModule {
}
