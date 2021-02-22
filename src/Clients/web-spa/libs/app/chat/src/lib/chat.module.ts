import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { StorageModule } from '@wlodzimierz/shared/storage';
import { NotificationsModule } from '@wlodzimierz/shared/notifications';

import { ChatComponent } from './chat.component';
import { ChatRoutingModule } from './chat-routing.module';
import { ReversePipe } from './conversation-messages/shared/pipes/reverse.pipe';
import { InterlocutorPipe } from './conversations/shared/pipes/interlocutor.pipe';
import * as fromConversations from './conversations/+state/conversations.reducer';
import { ConversationsFacade } from './conversations/+state/conversations.facade';
import { ConversationsEffects } from './conversations/+state/conversations.effects';
import { ConversationComponent } from './conversations/conversation/conversation.component';
import { AppUsersEqualsPipe } from './conversation-messages/shared/pipes/users-equals.pipe';
import { ConversationsService } from './conversations/shared/storage/conversations.service';
import { ConversationsEqualsPipe } from './conversations/shared/pipes/conversations-equals.pipe';
import * as fromConversationMessages from './conversation-messages/+state/conversation-messages.reducer';
import { ConversationMessagesFacade } from './conversation-messages/+state/conversation-messages.facade';
import { ConversationListComponent } from './conversations/conversation-list/conversation-list.component';
import { ConversationMessagesEffects } from './conversation-messages/+state/conversation-messages.effects';
import { ConversationsEndpointBuilder } from './conversations/shared/storage/conversations-endpoint.builder';
import { ConversationMessagesService } from './conversation-messages/shared/storage/conversation-messages.service';
import { ConversationMessageComponent } from './conversation-messages/conversation-message/conversation-message.component';
import { ConversationMessagesEndpointBuilder } from './conversation-messages/shared/storage/conversation-messages-endpoint.builder';
import { ConversationMessageListComponent } from './conversation-messages/conversation-message-list/conversation-message-list.component';
import { ConversationMessageCreateComponent } from './conversation-messages/conversation-message-create/conversation-message-create.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StorageModule,
    NotificationsModule,
    ChatRoutingModule,
    StoreModule.forFeature(
      fromConversations.CONVERSATIONS_FEATURE_KEY,
      fromConversations.reducer
    ),
    EffectsModule.forFeature([ConversationsEffects]),
    StoreModule.forFeature(
      fromConversationMessages.CONVERSATION_MESSAGES_FEATURE_KEY,
      fromConversationMessages.reducer
    ),
    EffectsModule.forFeature([ConversationMessagesEffects])
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
    AppUsersEqualsPipe,
    ReversePipe
  ],
  providers: [
    ConversationsFacade,
    ConversationMessagesFacade,
    ConversationsService,
    ConversationsEndpointBuilder,
    ConversationMessagesEndpointBuilder,
    ConversationMessagesService
  ]
})
export class ChatModule {
}
