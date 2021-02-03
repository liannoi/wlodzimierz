import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SoftwareComponent } from './software.component';
import { SoftwareRoutingModule } from './software-routing.module';

@NgModule({
  imports: [CommonModule, SoftwareRoutingModule],
  declarations: [SoftwareComponent]
})
export class SoftwareModule {
}
