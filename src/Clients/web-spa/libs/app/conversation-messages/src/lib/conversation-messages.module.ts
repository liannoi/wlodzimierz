import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ConversationsModule } from '@wlodzimierz/app/conversations';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { NotificationsModule } from '@wlodzimierz/shared/notifications';

import { ReversePipe } from './shared/pipes/reverse.pipe';
import { UsersEqualsPipe } from './shared/pipes/users-equals.pipe';
import * as fromConversationMessages from './+state/conversation-messages.reducer';
import { ConversationMessagesFacade } from './+state/conversation-messages.facade';
import { ConversationMessagesEffects } from './+state/conversation-messages.effects';
import { ConversationMessagesService } from './shared/storage/conversation-messages.service';
import { ConversationMessageComponent } from './conversation-message/conversation-message.component';
import { ConversationMessagesEndpointBuilder } from './shared/storage/conversation-messages-endpoint.builder';
import { ConversationMessageListComponent } from './conversation-message-list/conversation-message-list.component';
import { ConversationMessageCreateComponent } from './conversation-message-create/conversation-message-create.component';
import { DateModule } from '@wlodzimierz/shared/date';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NotificationsModule,
    ConversationsModule,
    DateModule,
    StoreModule.forFeature(
      fromConversationMessages.CONVERSATION_MESSAGES_FEATURE_KEY,
      fromConversationMessages.reducer
    ),
    EffectsModule.forFeature([ConversationMessagesEffects])
  ],
  declarations: [
    ConversationMessageComponent,
    ConversationMessageCreateComponent,
    ConversationMessageListComponent,
    ReversePipe,
    UsersEqualsPipe
  ],
  providers: [
    ConversationMessagesEndpointBuilder,
    ConversationMessagesService,
    ConversationMessagesFacade,
    DatePipe
  ],
  exports: [
    ConversationMessageListComponent,
    ConversationMessageCreateComponent
  ]
})
export class ConversationMessagesModule {
}
