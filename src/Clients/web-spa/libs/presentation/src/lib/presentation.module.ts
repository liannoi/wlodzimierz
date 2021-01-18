import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavTopMenuComponent } from './nav-top-menu/nav-top-menu.component';
import { NavFooterComponent } from './nav-footer/nav-footer.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NavTopMenuComponent, NavFooterComponent],
  exports: [NavTopMenuComponent, NavFooterComponent]
})
export class PresentationModule {
}
