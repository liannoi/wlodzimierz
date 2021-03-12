import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { StorageModule } from '@wlodzimierz/shared/storage';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ConversationsModule } from '@wlodzimierz/app/conversations';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
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
    ChatRoutingModule
  ],
  declarations: [ChatComponent]
})
export class ChatModule {
}
