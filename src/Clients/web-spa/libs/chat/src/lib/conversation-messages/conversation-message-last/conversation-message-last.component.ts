import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { ConversationMessage } from '../shared/conversation-message.model';
import { ChatFacade } from '../../+state/chat.facade';
import { Conversation } from '../../conversations/shared/models/conversation.model';
import { ConversationsService } from '../../conversations/shared/services/conversations.service';

@Component({
  selector: 'wlodzimierz-conversation-message-last',
  templateUrl: './conversation-message-last.component.html',
  styleUrls: ['./conversation-message-last.component.scss']
})
export class ConversationMessageLastComponent implements OnInit, OnDestroy {
  public lastMessage$: Observable<ConversationMessage>;
  private currentConversation$: Observable<Conversation>;
  private subscriptions: Subscription[] = [];

  public constructor(private chatFacade: ChatFacade, private conversationsService: ConversationsService) {
    this.lastMessage$ = this.chatFacade.lastMessage$;
    this.currentConversation$ = this.chatFacade.currentConversation$;
  }

  public ngOnInit(): void {
    this.conversationsService.follow(conversation => this.chatFacade.selectConversation(conversation));
    this.subscriptions.push(this.currentConversation$.subscribe(conversation => this.chatFacade.loadLastMessage(conversation)));
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
    this.conversationsService.onDispose();
  }
}
