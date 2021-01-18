import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthModule} from './auth/auth.module';
import {DocsModule} from './docs/docs.module';
import {HomeModule} from './home/home.module';
import {LayoutModule} from './layout/layout.module';

@NgModule({
  imports: [
    CommonModule,
    AuthModule,
    DocsModule,
    HomeModule,
    LayoutModule,
  ],
  exports: [
    LayoutModule
  ]
})
export class PresentationModule {
}
