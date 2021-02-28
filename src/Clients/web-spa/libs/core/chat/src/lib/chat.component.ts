import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { UsersFacade } from '@wlodzimierz/app/users';

import { User } from 'libs/app/users/src/lib/shared/models/user.model';
import { Conversation } from '../../../../app/conversations/src/lib/shared/models/conversation.model';
import { ConversationsList } from '../../../../app/conversations/src/lib/shared/models/conversations-list.model';
import { ConversationMessagesList } from '../../../../app/conversation-messages/src/lib/shared/models/conversation-messages-list.model';
import { NotificationsService } from '../../../../shared/notifications/src/lib/services/notifications.service';
import { ConversationMessagesService } from '../../../../app/conversation-messages/src/lib/shared/storage/conversation-messages.service';
import { ChangedNotification } from '../../../../app/conversations/src/lib/shared/notifications/change/changed.notification';
import { CreatedNotification } from '../../../../app/conversation-messages/src/lib/shared/notifications/create/created.notification';
import { ConversationsFacade } from '../../../../app/conversations/src/lib/+state/conversations.facade';
import { ConversationMessagesFacade } from '../../../../app/conversation-messages/src/lib/+state/conversation-messages.facade';

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
    private messagesFacade: ConversationMessagesFacade,
    private conversationsFacade: ConversationsFacade,
    private conversationMessagesService: ConversationMessagesService,
    private notificationsService: NotificationsService
  ) {
  }

  public async ngOnInit() {
    this.conversations$ = this.conversationsFacade.conversations$;
    this.messages$ = this.messagesFacade.messages$;
    this.followUser();
    await this.listenSockets();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((e) => e.unsubscribe());
  }

  public onChangeConversation($event: ChangedNotification): void {
    this.bindingConversation = $event.conversation;
    this.messagesFacade.getAll(this.bindingConversation);
  }

  public onCreateConversationMessage($event: CreatedNotification): void {
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

  private async listenSockets() {
    this.conversationMessagesService.onCreated(() => {
      this.messagesFacade.getAll(this.bindingConversation);
      this.conversationsFacade.getAll(this.user);
    });
    await this.notificationsService.start();
  }
}
