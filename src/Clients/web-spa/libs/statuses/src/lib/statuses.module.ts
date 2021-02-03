import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusesRoutingModule } from './statuses-routing.module';
import { StatusNotFoundComponent } from './status-not-found/status-not-found.component';

@NgModule({
  imports: [CommonModule, StatusesRoutingModule],
  declarations: [StatusNotFoundComponent]
})
export class StatusesModule {
}
