import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusNotFoundComponent } from './status-not-found/status-not-found.component';
import { StatusesRoutingModule } from './statuses-routing.module';

@NgModule({
  declarations: [StatusNotFoundComponent],
  imports: [CommonModule, StatusesRoutingModule]
})
export class StatusesModule {
}
