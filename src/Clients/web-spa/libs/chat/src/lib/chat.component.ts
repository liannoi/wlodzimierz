import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { UsersFacade } from '@wlodzimierz/users';
import { ConversationMessagesFacade, ConversationsFacade } from '@wlodzimierz/chat';

import { ConversationsList } from './conversations/shared/models/conversations-list.models';
import { User } from '../../../users/src/lib/shared/models/user.model';
import { Conversation } from './conversations/shared/models/conversation.model';
import { ChangeConversationEvent } from './conversations/shared/events/change-conversation.event';
import { ConversationMessagesList } from './conversation-messages/shared/models/conversation-messages-list.model';
import { CreateConversationMessageEvent } from './conversation-messages/shared/events/create-conversation-message.event';

@Component({
  selector: 'wlodzimierz-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  public user: User;
  public bindingConversation: Conversation;
  public conversations$: Observable<ConversationsList>;
  public messages$: Observable<ConversationMessagesList>;
  private subscriptions: Subscription[] = [];

  public constructor(
    private usersFacade: UsersFacade,
    private conversationsFacade: ConversationsFacade,
    private messagesFacade: ConversationMessagesFacade
  ) {
  }

  public ngOnInit(): void {
    this.conversations$ = this.conversationsFacade.conversations$;
    this.messages$ = this.messagesFacade.messages$;
    this.followUser();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((e) => e.unsubscribe());
  }

  public onChangeConversation($event: ChangeConversationEvent) {
    this.bindingConversation = $event.conversation;
    this.messagesFacade.getAll(this.bindingConversation);
  }

  public onCreateConversationMessage($event: CreateConversationMessageEvent): void {
    this.messagesFacade.create($event.message);
  }

  ///////////////////////////////////////////////////////////////////////////
  // Helpers
  ///////////////////////////////////////////////////////////////////////////

  private followUser(): void {
    this.subscriptions.push(
      this.usersFacade.currentUser$.subscribe((user: User) => {
        this.user = user;
        this.conversationsFacade.getAll(user);
      })
    );
  }
}
