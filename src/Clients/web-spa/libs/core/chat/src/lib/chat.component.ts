import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UsersFacade } from '@wlodzimierz/app/users';
import { ConversationMessagesFacade, ConversationsFacade } from '@wlodzimierz/app/chat';

import { Conversation } from '../../../../app/conversations/src/lib/shared/models/conversation.model';
import { CreateEvent } from '../../../../app/conversation-messages/src/lib/shared/events/create.event';
import { ConversationsList } from '../../../../app/conversations/src/lib/shared/models/conversations-list.model';
import { ChangeConversationEvent } from '../../../../app/conversations/src/lib/shared/events/change-conversation.event';
import { ConversationMessagesList } from '../../../../app/conversation-messages/src/lib/shared/models/conversation-messages-list.model';
import { ConversationMessagesService } from '../../../../app/conversation-messages/src/lib/shared/storage/conversation-messages.service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { User } from '../../../../app/users/src/lib/shared/models/user.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { NotificationsService } from '../../../../shared/notifications/src/lib/services/notifications.service';

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
    private messagesFacade: ConversationMessagesFacade,
    private notificationsService: NotificationsService,
    private conversationMessagesService: ConversationMessagesService
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

  public onChangeConversation($event: ChangeConversationEvent): void {
    this.bindingConversation = $event.conversation;
    this.messagesFacade.getAll(this.bindingConversation);
  }

  public onCreateConversationMessage($event: CreateEvent): void {
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
