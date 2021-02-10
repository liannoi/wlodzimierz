import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { ChatFacade } from '@wlodzimierz/chat';

import { ConversationMessage } from '../shared/conversation-message.model';
import { Conversation } from '../../conversations/shared/models/conversation.model';

@Component({
  selector: 'wlodzimierz-conversation-message-last',
  templateUrl: './conversation-message-last.component.html',
  styleUrls: ['./conversation-message-last.component.scss']
})
export class ConversationMessageLastComponent implements OnInit {
  public currentConversation$: Observable<Conversation>;
  public lastMessage$: Observable<ConversationMessage>;

  public constructor(private chatFacade: ChatFacade) {
    this.currentConversation$ = this.chatFacade.currentConversation$;
    this.lastMessage$ = this.chatFacade.lastMessage$;
  }

  public ngOnInit(): void {
    this.chooseConversation();
    this.followCurrentConversation();
  }

  ///////////////////////////////////////////////////////////////////////////
  // Helpers
  ///////////////////////////////////////////////////////////////////////////

  private chooseConversation() {
    this.chatFacade.selectConversation({
      conversationId: 1,
      leftUserId: '5d08c7e2-3f91-41c1-87d1-253d77c5d19a',
      leftUser: null,
      rightUserId: '73ffd8fd-8c6a-4af9-b0e5-0f8428438852',
      rightUser: null
    });
  }

  private followCurrentConversation() {
    // TODO: Unsubscribe and refactor! (Behavior Subject Value Object)
    this.currentConversation$.subscribe((conv) => {
      this.chatFacade.loadLastMessage(conv);
    });
  }
}
