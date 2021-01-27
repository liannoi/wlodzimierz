import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ConversationModel } from '@wlodzimierz/domain/src/lib/models/conversation.model';

@Component({
  selector: 'wlodzimierz-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  public currentConversation: ConversationModel;

  public constructor(private titleService: Title) {
    titleService.setTitle('Wlodzimierz');
  }

  public onConversationChanged(conversation: ConversationModel): void {
    this.currentConversation = conversation;
  }
}
