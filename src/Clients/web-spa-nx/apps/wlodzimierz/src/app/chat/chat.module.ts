import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatComponent } from './chat.component';
import { ChatRoutingModule } from './chat-routing.module';
import { ConversationListComponent } from './conversations/conversation-list/conversation-list.component';
import { ConversationMessageListComponent } from './conversation-messages/conversation-message-list/conversation-message-list.component';
import { ConversationMessageComponent } from './conversation-messages/conversation-message/conversation-message.component';

@NgModule({
  declarations: [
    ChatComponent,
    ConversationListComponent,
    ConversationMessageComponent,
    ConversationMessageListComponent
  ],
  imports: [CommonModule, ChatRoutingModule]
})
export class ChatModule {
}
