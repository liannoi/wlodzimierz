import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ChatComponent } from './chat.component';
import { ChatRoutingModule } from './chat-routing.module';
import { ConversationListComponent } from './conversations/conversation-list/conversation-list.component';
import { ConversationComponent } from './conversations/conversation/conversation.component';
import * as fromConversations from './conversations/+state/conversations.reducer';
import { ConversationsEffects } from './conversations/+state/conversations.effects';
import { ConversationsFacade } from './conversations/+state/conversations.facade';
// eslint-disable-next-line max-len
import { ConversationMessageCreateComponent } from './conversation-messages/conversation-message-create/conversation-message-create.component';
import { ConversationMessageComponent } from './conversation-messages/conversation-message/conversation-message.component';
import { ConversationMessageListComponent } from './conversation-messages/conversation-message-list/conversation-message-list.component';
import { InterlocutorPipe } from './conversations/shared/pipes/interlocutor.pipe';
import { ConversationsEqualsPipe } from './conversations/shared/pipes/conversations-equals.pipe';
import { UsersEqualsPipe } from './conversation-messages/shared/pipes/users-equals.pipe';
import { ReversePipe } from './conversation-messages/shared/pipes/reverse.pipe';
import * as fromConversationMessages from './conversation-messages/+state/conversation-messages.reducer';
import { ConversationMessagesEffects } from './conversation-messages/+state/conversation-messages.effects';
import { ConversationMessagesFacade } from './conversation-messages/+state/conversation-messages.facade';
import { ConversationsService } from './conversations/shared/services/conversations.service';
import { ConversationsEndpointBuilder } from './conversations/shared/builders/conversations-endpoint.builder';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ChatRoutingModule,
    StoreModule.forFeature(fromConversations.CONVERSATIONS_FEATURE_KEY, fromConversations.reducer),
    EffectsModule.forFeature([ConversationsEffects]),
    StoreModule.forFeature(
      fromConversationMessages.CONVERSATION_MESSAGES_FEATURE_KEY,
      fromConversationMessages.reducer
    ),
    EffectsModule.forFeature([ConversationMessagesEffects]),
    ReactiveFormsModule
  ],
  declarations: [
    ChatComponent,
    ConversationListComponent,
    ConversationComponent,
    ConversationMessageCreateComponent,
    ConversationMessageComponent,
    ConversationMessageListComponent,
    ConversationsEqualsPipe,
    InterlocutorPipe,
    UsersEqualsPipe,
    ReversePipe
  ],
  providers: [ConversationsFacade, ConversationMessagesFacade, ConversationsService, ConversationsEndpointBuilder]
})
export class ChatModule {
}
