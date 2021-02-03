import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';

import { AuthFacadeImpl } from '@wlodzimierz/infrastructure/src/lib/storage/users/auth.facade';
import { AuthServiceImpl } from '@wlodzimierz/infrastructure/src/lib/storage/users/services/auth.service';
import { UsersServiceImpl } from '@wlodzimierz/infrastructure/src/lib/storage/users/services/users.service';
import { JwtTokenServiceImpl } from '@wlodzimierz/infrastructure/src/lib/storage/users/cookies/jwt-token.service';
import { UsersEndpointBuilder } from '@wlodzimierz/infrastructure/src/lib/storage/users/users-endpoint.builder';
import { ConversationsServiceImpl } from '@wlodzimierz/infrastructure/src/lib/storage/conversations/conversations.service';
import { ConversationsEndpointBuilder } from '@wlodzimierz/infrastructure/src/lib/storage/conversations/conversations-endpoint.builder';
import { ConversationMessagesServiceImpl } from '@wlodzimierz/infrastructure/src/lib/storage/conversation-messages/conversation-messages.service';
import { ConversationMessagesEndpointBuilder } from '@wlodzimierz/infrastructure/src/lib/storage/conversation-messages/conversation-messages-endpoint.builder';
import { AppSettingsServiceImpl } from '@wlodzimierz/infrastructure/src/lib/common/services/app-settings.service';
import { UserNameServiceImpl } from '@wlodzimierz/infrastructure/src/lib/storage/users/cookies/username.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    CookieService,
    AuthFacadeImpl,
    AuthServiceImpl,
    UsersServiceImpl,
    UserNameServiceImpl,
    JwtTokenServiceImpl,
    UsersEndpointBuilder,
    ConversationsServiceImpl,
    ConversationsEndpointBuilder,
    ConversationMessagesServiceImpl,
    ConversationMessagesEndpointBuilder,
    AppSettingsServiceImpl
  ]
})
export class InfrastructureModule {
}
