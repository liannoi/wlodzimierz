import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { StorageModule } from '@wlodzimierz/shared/storage';
import { NotificationsModule } from '@wlodzimierz/shared/notifications';

import { ReversePipe } from '../../../../app/conversation-messages/src/lib/shared/pipes/reverse.pipe';
import { AppUsersEqualsPipe } from '../../../../app/conversation-messages/src/lib/shared/pipes/users-equals.pipe';
import * as fromConversationMessages from '../../../../app/conversation-messages/src/lib/+state/conversation-messages.reducer';
import { ConversationMessagesFacade } from '../../../../app/conversation-messages/src/lib/+state/conversation-messages.facade';
import { ConversationMessagesEffects } from '../../../../app/conversation-messages/src/lib/+state/conversation-messages.effects';
import { ConversationMessagesService } from '../../../../app/conversation-messages/src/lib/shared/storage/conversation-messages.service';
import { ConversationMessageComponent } from '../../../../app/conversation-messages/src/lib/conversation-message/conversation-message.component';
import { ConversationMessagesEndpointBuilder } from '../../../../app/conversation-messages/src/lib/shared/storage/conversation-messages-endpoint.builder';
import { ConversationMessageListComponent } from '../../../../app/conversation-messages/src/lib/conversation-message-list/conversation-message-list.component';
import { ConversationMessageCreateComponent } from '../../../../app/conversation-messages/src/lib/conversation-message-create/conversation-message-create.component';

import { ChatComponent } from './chat.component';
import { ChatRoutingModule } from './chat-routing.module';
import { ConversationsModule } from '@wlodzimierz/app/conversations';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StorageModule,
    NotificationsModule,
    ConversationsModule,
    ChatRoutingModule,
    StoreModule.forFeature(
      fromConversationMessages.CONVERSATION_MESSAGES_FEATURE_KEY,
      fromConversationMessages.reducer
    ),
    EffectsModule.forFeature([ConversationMessagesEffects])
  ],
  declarations: [
    ChatComponent,
    ConversationMessageCreateComponent,
    ConversationMessageComponent,
    ConversationMessageListComponent,
    AppUsersEqualsPipe,
    ReversePipe
  ],
  providers: [
    ConversationMessagesFacade,
    ConversationMessagesEndpointBuilder,
    ConversationMessagesService
  ]
})
export class ChatModule {
}
