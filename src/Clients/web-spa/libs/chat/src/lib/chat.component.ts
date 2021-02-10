import { Component, OnInit } from '@angular/core';

import { ConversationsService } from './conversations/shared/services/conversations.service';

@Component({
  selector: 'wlodzimierz-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public constructor(private conversationsService: ConversationsService) {
  }

  public ngOnInit(): void {
    this.conversationsService.emit({
      'conversationId': 1,
      'leftUserId': '5d08c7e2-3f91-41c1-87d1-253d77c5d19a',
      'leftUser': null,
      'rightUserId': '73ffd8fd-8c6a-4af9-b0e5-0f8428438852',
      'rightUser': null
    });
  }
}
