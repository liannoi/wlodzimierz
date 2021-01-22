import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationsRoutingModule } from '@wlodzimierz/presentation/applications/src/lib/applications-routing.module';
import { ApplicationsComponent } from '@wlodzimierz/presentation/applications/src/lib/applications.component';

@NgModule({
  imports: [CommonModule, ApplicationsRoutingModule],
  declarations: [ApplicationsComponent]
})
export class ApplicationsModule {
}
