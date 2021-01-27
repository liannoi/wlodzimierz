import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ChatComponent } from './chat.component';
import { ChatRoutingModule } from './chat-routing.module';
import { ConversationListComponent } from './conversations/conversation-list/conversation-list.component';
import { ConversationMessageListComponent } from './conversation-messages/conversation-message-list/conversation-message-list.component';
import { ConversationMessageComponent } from './conversation-messages/conversation-message/conversation-message.component';
import { ConversationMessageCreateComponent } from './conversation-messages/conversation-message-create/conversation-message-create.component';
import { ReversePipe } from './conversation-messages/shared/reverse.pipe';
import { InterlocutorPipe } from './conversations/shared/interlocutor.pipe';
import { ConversationsEqualsPipe } from './conversations/shared/conversations-equals.pipe';
import { UsersEqualsPipe } from './conversations/shared/users-equals.pipe';

@NgModule({
  declarations: [
    ChatComponent,
    ConversationListComponent,
    ConversationMessageComponent,
    ConversationMessageListComponent,
    ConversationMessageCreateComponent,
    ReversePipe,
    InterlocutorPipe,
    ConversationsEqualsPipe,
    UsersEqualsPipe
  ],
  imports: [CommonModule, ChatRoutingModule, ReactiveFormsModule]
})
export class ChatModule {
}
