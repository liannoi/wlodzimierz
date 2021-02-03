import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusNotFoundComponent } from './status-not-found.component';
import { StatusNotFoundRoutingModule } from './status-not-found-routing.module';

@NgModule({
  imports: [CommonModule, StatusNotFoundRoutingModule],
  declarations: [StatusNotFoundComponent]
})
export class StatusNotFoundModule {
}
