import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from '@wlodzimierz/chat/src/lib/chat-routing.module';
import { ChatComponent } from '@wlodzimierz/chat/src/lib/chat.component';

@NgModule({
  imports: [CommonModule, ChatRoutingModule],
  declarations: [ChatComponent]
})
export class ChatModule {
}
