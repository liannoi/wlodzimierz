import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AuthServiceImpl } from '@wlodzimierz/infrastructure/src/lib/storage/users/core/auth.service';
import { AuthFacadeImpl } from '@wlodzimierz/infrastructure/src/lib/storage/users/auth.facade';
import { JwtTokenServiceImpl } from '@wlodzimierz/infrastructure/src/lib/storage/users/core/jwt-token.service';
import { UsersEndpointBuilder } from '@wlodzimierz/infrastructure/src/lib/storage/users/users-endpoint.builder';
import { ConversationsServiceImpl } from '@wlodzimierz/infrastructure/src/lib/storage/conversations/conversations.service';
import { ConversationsEndpointBuilder } from '@wlodzimierz/infrastructure/src/lib/storage/conversations/conversations-endpoint.builder';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    AuthServiceImpl,
    JwtTokenServiceImpl,
    AuthFacadeImpl,
    UsersEndpointBuilder,
    ConversationsServiceImpl,
    ConversationsEndpointBuilder
  ]
})
export class InfrastructureModule {
}
