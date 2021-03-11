import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { UsersFacade } from '@wlodzimierz/app/users';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserModel } from 'libs/app/users/src/lib/shared/models/user.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Conversation } from '../../../../app/conversations/src/lib/shared/models/conversation.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ConversationsList } from '../../../../app/conversations/src/lib/shared/models/conversations-list.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ConversationMessagesList } from '../../../../app/conversation-messages/src/lib/shared/models/conversation-messages-list.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { NotificationsService } from '../../../../shared/notifications/src/lib/services/notifications.service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ConversationMessagesService } from '../../../../app/conversation-messages/src/lib/shared/storage/conversation-messages.service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ChangedNotification } from '../../../../app/conversations/src/lib/shared/notifications/change/changed.notification';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CreatedNotification } from '../../../../app/conversation-messages/src/lib/shared/notifications/create/created.notification';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ConversationsFacade } from '../../../../app/conversations/src/lib/+state/conversations.facade';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ConversationMessagesFacade } from '../../../../app/conversation-messages/src/lib/+state/conversation-messages.facade';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'wlodzimierz-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  public user: UserModel;
  public bindingConversation: Conversation;
  public conversations$: Observable<ConversationsList>;
  public messages$: Observable<ConversationMessagesList>;
  private subscriptions: Subscription[] = [];

  public constructor(
    private usersFacade: UsersFacade,
    private messagesFacade: ConversationMessagesFacade,
    private conversationsFacade: ConversationsFacade,
    private conversationMessagesService: ConversationMessagesService,
    private notificationsService: NotificationsService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Wlodzimierz');
  }

  public async ngOnInit() {
    this.conversations$ = this.conversationsFacade.conversations$;
    this.messages$ = this.messagesFacade.messages$;
    this.followUser();
    await this.listenSockets();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((e) => e.unsubscribe());
    this.notificationsService.onDispose();
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
      this.usersFacade.currentUser$.subscribe((user: UserModel) => {
        this.user = user;
        this.conversationsFacade.getAll(user);
      })
    );
  }

  private async listenSockets() {
    this.conversationMessagesService.onCreated(() => {
      // this.messagesFacade.getAll(this.bindingConversation);
      this.conversationsFacade.getAll(this.user);
    });
    await this.notificationsService.start();
  }
}
