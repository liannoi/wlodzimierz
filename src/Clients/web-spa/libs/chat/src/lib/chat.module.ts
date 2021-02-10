import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthModule } from '@wlodzimierz/auth';

import { ChatComponent } from './chat.component';
import { ChatRoutingModule } from './chat-routing.module';
import { ConversationListComponent } from './conversations/conversation-list/conversation-list.component';
import { ConversationComponent } from './conversations/conversation/conversation.component';
import { ConversationMessageLastComponent } from './conversation-messages/conversation-message-last/conversation-message-last.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromChat from './+state/chat.reducer';
import { ChatEffects } from './+state/chat.effects';
import { ChatFacade } from './+state/chat.facade';
import { ConversationsService } from './conversations/shared/services/conversations.service';
import { ConversationsEndpointBuilder } from './conversations/shared/builders/conversations-endpoint.builder';

@NgModule({
  declarations: [
    ChatComponent,
    ConversationListComponent,
    ConversationComponent,
    ConversationMessageLastComponent
  ],
  imports: [
    CommonModule,
    AuthModule,
    ChatRoutingModule,
    StoreModule.forFeature(fromChat.CHAT_FEATURE_KEY, fromChat.reducer),
    EffectsModule.forFeature([ChatEffects])
  ],
  providers: [ChatFacade, ConversationsService, ConversationsEndpointBuilder]
})
export class ChatModule {
}
