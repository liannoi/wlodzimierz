import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ChatComponent} from './chat.component';
import {ChatRoutingModule} from './chat-routing.module';
import {UserConversationsComponent} from './user-conversations/user-conversations.component';
import {ConversationMessageComponent} from './conversation-message/conversation-message.component';

@NgModule({
  declarations: [
    ChatComponent,
    UserConversationsComponent,
    ConversationMessageComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule
  ]
})
export class ChatModule {
}
