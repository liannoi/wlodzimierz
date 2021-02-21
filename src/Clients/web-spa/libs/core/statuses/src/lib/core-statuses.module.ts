import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundComponent } from './not-found/not-found.component';
import { CoreStatusesRoutingModule } from './statuses-routing.module';

@NgModule({
  imports: [CommonModule, CoreStatusesRoutingModule],
  declarations: [NotFoundComponent]
})
export class CoreStatusesModule {
}
