import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AuthServiceImpl } from '@wlodzimierz/infrastructure/src/lib/storage/users/auth/auth.service';
import { AuthFacadeImpl } from '@wlodzimierz/infrastructure/src/lib/storage/users/auth/auth.facade';
import { JwtTokenServiceImpl } from '@wlodzimierz/infrastructure/src/lib/storage/users/auth/jwt-token.service';
import { UsersEndpointBuilder } from '@wlodzimierz/infrastructure/src/lib/storage/users/users-endpoint.builder';
import { ConversationsServiceImpl } from '@wlodzimierz/infrastructure/src/lib/storage/conversations/conversations.service';
import { ConversationsEndpointBuilder } from '@wlodzimierz/infrastructure/src/lib/storage/conversations/conversations-endpoint.builder';
import { UsersServiceImpl } from '@wlodzimierz/infrastructure/src/lib/storage/users/users.service';
import { ConversationMessagesServiceImpl } from '@wlodzimierz/infrastructure/src/lib/storage/conversation-messages/conversation-messages.service';
import { ConversationMessagesEndpointBuilder } from '@wlodzimierz/infrastructure/src/lib/storage/conversation-messages/conversation-messages-endpoint.builder';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    AuthFacadeImpl,
    AuthServiceImpl,
    UsersServiceImpl,
    JwtTokenServiceImpl,
    UsersEndpointBuilder,
    ConversationsServiceImpl,
    ConversationsEndpointBuilder,
    ConversationMessagesServiceImpl,
    ConversationMessagesEndpointBuilder
  ]
})
export class InfrastructureModule {
}
