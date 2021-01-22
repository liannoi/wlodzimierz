import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from '@wlodzimierz/presentation/chat/src/lib/chat-routing.module';
import { ChatComponent } from '@wlodzimierz/presentation/chat/src/lib/chat.component';

@NgModule({
  imports: [CommonModule, ChatRoutingModule],
  declarations: [ChatComponent]
})
export class ChatModule {
}
