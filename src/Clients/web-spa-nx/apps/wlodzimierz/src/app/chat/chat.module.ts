import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ChatComponent } from './chat.component';
import { ChatRoutingModule } from './chat-routing.module';
import { ConversationListComponent } from './conversations/conversation-list/conversation-list.component';
import { ConversationMessageListComponent } from './conversation-messages/conversation-message-list/conversation-message-list.component';
import { ConversationMessageComponent } from './conversation-messages/conversation-message/conversation-message.component';
import { ConversationMessageCreateComponent } from './conversation-messages/conversation-message-create/conversation-message-create.component';
import { ReversePipe } from './shared/reverse.pipe';

@NgModule({
  declarations: [
    ChatComponent,
    ConversationListComponent,
    ConversationMessageComponent,
    ConversationMessageListComponent,
    ConversationMessageCreateComponent,
    ReversePipe
  ],
  imports: [CommonModule, ChatRoutingModule, ReactiveFormsModule]
})
export class ChatModule {
}
