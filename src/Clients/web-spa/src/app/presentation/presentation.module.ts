import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthModule} from './auth/auth.module';
import {DocsModule} from './docs/docs.module';
import {HomeModule} from './home/home.module';
import {LayoutModule} from './layout/layout.module';
import {ChatModule} from './chat/chat.module';

@NgModule({
  imports: [
    CommonModule,
    AuthModule,
    ChatModule,
    DocsModule,
    HomeModule,
    LayoutModule,
  ],
  exports: [LayoutModule]
})
export class PresentationModule {
}
