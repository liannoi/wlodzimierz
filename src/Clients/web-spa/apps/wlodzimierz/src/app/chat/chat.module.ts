import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ChatComponent } from './chat.component';
import { ChatRoutingModule } from './chat-routing.module';
import { ConversationListComponent } from './conversations/conversation-list/conversation-list.component';
import { ConversationMessageListComponent } from './conversation-messages/conversation-message-list/conversation-message-list.component';
import { ConversationMessageLastComponent } from './conversation-messages/conversation-message-last/conversation-message-last.component';
import { ConversationMessageCreateComponent } from './conversation-messages/conversation-message-create/conversation-message-create.component';
import { ReversePipe } from '@wlodzimierz/application/src/lib/storage/conversation-messages/pipes/reverse.pipe';
import { InterlocutorPipe } from '@wlodzimierz/application/src/lib/storage/conversations/pipes/interlocutor.pipe';
import { ConversationsEqualsPipe } from '@wlodzimierz/application/src/lib/storage/conversations/pipes/conversations-equals.pipe';
import { UsersEqualsPipe } from '@wlodzimierz/application/src/lib/storage/conversations/pipes/users-equals.pipe';
import { ConversationComponent } from './conversations/conversation/conversation.component';
import { ConversationMessageComponent } from './conversation-messages/conversation-message/conversation-message.component';

@NgModule({
  declarations: [
    ChatComponent,
    ConversationComponent,
    ConversationListComponent,
    ConversationMessageComponent,
    ConversationMessageLastComponent,
    ConversationMessageListComponent,
    ConversationMessageCreateComponent,
    ReversePipe,
    InterlocutorPipe,
    ConversationsEqualsPipe,
    UsersEqualsPipe
  ],
  imports: [CommonModule, ReactiveFormsModule, ChatRoutingModule]
})
export class ChatModule {
}