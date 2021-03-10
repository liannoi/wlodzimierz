import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StorageModule } from '@wlodzimierz/shared/storage';
import { ConversationsModule } from '@wlodzimierz/app/conversations';
import { ConversationMessagesModule } from '@wlodzimierz/app/conversation-messages';

import { ChatComponent } from './chat.component';
import { ChatRoutingModule } from './chat-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StorageModule,
    ConversationsModule,
    ConversationMessagesModule,
    ChatRoutingModule,
  ],
  declarations: [ChatComponent],
})
export class ChatModule {}
