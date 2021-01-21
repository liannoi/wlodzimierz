import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {ApplicationModule} from '../application/application.module';
import {AuthServiceImpl} from './storage/users/services/auth.service';
import {JwtTokenServiceImpl} from './storage/users/services/jwt-token.service';
import {AuthFacadeImpl} from './storage/users/auth.facade';
import {ConversationsServiceImpl} from './storage/conversations/conversations.service';
import {UsersServiceImpl} from './storage/users/services/users.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ApplicationModule
  ],
  providers: [
    AuthServiceImpl,
    UsersServiceImpl,
    JwtTokenServiceImpl,
    AuthFacadeImpl,
    ConversationsServiceImpl
  ]
})
export class InfrastructureModule {
}
