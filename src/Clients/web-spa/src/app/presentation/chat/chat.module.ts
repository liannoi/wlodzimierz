import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ChatComponent} from './chat.component';
import {ChatRoutingModule} from './chat-routing.module';
import {UserConversationsComponent} from './user-conversations/user-conversations.component';
import {ConversationMessageComponent} from './conversation-messages/conversation-message/conversation-message.component';
import {ConversationMessageListComponent} from './conversation-messages/conversation-message-list/conversation-message-list.component';

@NgModule({
  declarations: [
    ChatComponent,
    UserConversationsComponent,
    ConversationMessageComponent,
    ConversationMessageListComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule
  ]
})
export class ChatModule {
}
