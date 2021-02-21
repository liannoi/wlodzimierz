import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { SharedStorageModule } from '@wlodzimierz/shared/storage';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { SharedNotificationsModule } from '@wlodzimierz/shared/notifications';

import { AppChatComponent } from './chat.component';
import { AppChatRoutingModule } from './chat-routing.module';
import { ConversationListComponent } from './conversations/conversation-list/conversation-list.component';
import { ConversationComponent } from './conversations/conversation/conversation.component';
import * as fromConversations from './conversations/+state/conversations.reducer';
import { ConversationsEffects } from './conversations/+state/conversations.effects';
import { ConversationsFacade } from './conversations/+state/conversations.facade';
import { ConversationMessageCreateComponent } from './conversation-messages/conversation-message-create/conversation-message-create.component';
import { ConversationMessageComponent } from './conversation-messages/conversation-message/conversation-message.component';
import { ConversationMessageListComponent } from './conversation-messages/conversation-message-list/conversation-message-list.component';
import { InterlocutorPipe } from './conversations/shared/pipes/interlocutor.pipe';
import { ConversationsEqualsPipe } from './conversations/shared/pipes/conversations-equals.pipe';
import { AppUsersEqualsPipe } from './conversation-messages/shared/pipes/users-equals.pipe';
import { ReversePipe } from './conversation-messages/shared/pipes/reverse.pipe';
import * as fromConversationMessages from './conversation-messages/+state/conversation-messages.reducer';
import { ConversationMessagesEffects } from './conversation-messages/+state/conversation-messages.effects';
import { ConversationMessagesFacade } from './conversation-messages/+state/conversation-messages.facade';
import { ConversationsService } from './conversations/shared/storage/conversations.service';
import { ConversationsEndpointBuilder } from './conversations/shared/storage/conversations-endpoint.builder';
import { ConversationMessagesEndpointBuilder } from './conversation-messages/shared/storage/conversation-messages-endpoint.builder';
import { ConversationMessagesService } from './conversation-messages/shared/storage/conversation-messages.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedStorageModule,
    SharedNotificationsModule,
    AppChatRoutingModule,
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
    AppChatComponent,
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
export class AppChatModule {
}
