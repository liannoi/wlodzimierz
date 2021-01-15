import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {WebRoutingModule} from './web-routing.module';
import {WebAppComponent} from './web-app.component';
import {UsersConversationsComponent} from './users/conversations/users-conversations.component';
import {UsersService} from './users/shared/users.service';
import {ApiEndpointBuilder} from '../shared/api.constants';
import {HttpClientModule} from '@angular/common/http';
import {ConversationMessagesComponent} from './conversations/messages/conversation-messages.component';
import {ConversationsService} from './conversations/conversations.service';

@NgModule({
  declarations: [
    WebAppComponent,
    UsersConversationsComponent,
    ConversationMessagesComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    WebRoutingModule
  ],
  providers: [
    ApiEndpointBuilder,
    UsersService,
    ConversationsService,
  ]
})
export class WebModule {
}
