import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from '@wlodzimierz/presentation/home/src/lib/home.component';
import { HomeRoutingModule } from '@wlodzimierz/presentation/home/src/lib/home-routing.module';

@NgModule({
  imports: [CommonModule, HomeRoutingModule],
  declarations: [HomeComponent]
})
export class HomeModule {
}
