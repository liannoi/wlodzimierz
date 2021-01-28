import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ConversationsServiceImpl } from '@wlodzimierz/infrastructure/src/lib/storage/conversations/conversations.service';
import { ConversationsService } from '@wlodzimierz/application/src/lib/storage/conversations/conversations.service';
import { ConversationMessagesListModel } from '@wlodzimierz/domain/src/lib/models/conversation-messages-list.model';
import { ConversationModel } from '@wlodzimierz/domain/src/lib/models/conversation.model';
import { UserModel } from '@wlodzimierz/domain/src/lib/models/user.model';
import { MessagesQuery } from '@wlodzimierz/application/src/lib/storage/conversations/queries/messages.query';
import { MessagesNotification } from '@wlodzimierz/domain/src/lib/notifications/conversations/messages.notification';
import { ConversationMessageModel } from '@wlodzimierz/domain/src/lib/models/conversation-message.model';
import { Identifiable } from '@wlodzimierz/application/src/lib/common/interfaces/identifiable.interface';
import { ConversationMessageListSubscriber } from '@wlodzimierz/application/src/lib/storage/conversation-messages/subscribers/conversation-message-list.subscriber';
import { ConversationSubscriber } from '@wlodzimierz/application/src/lib/storage/conversations/subscribers/conversation.subscriber';
import { UserSubscriber } from '@wlodzimierz/application/src/lib/storage/users/subscribers/user.subscriber';

@Component({
  selector: 'wlodzimierz-conversation-message-list',
  templateUrl: './conversation-message-list.component.html',
  styleUrls: ['./conversation-message-list.component.scss']
})
export class ConversationMessageListComponent
  implements OnInit, OnDestroy, Identifiable<ConversationMessageModel, number>, MessagesNotification {
  public currentConversation: ConversationModel;
  public currentUser: UserModel;
  private messagesSubscriber: ConversationMessageListSubscriber = new ConversationMessageListSubscriber();
  private conversationSubscriber: ConversationSubscriber = new ConversationSubscriber();
  private userSubscriber: UserSubscriber = new UserSubscriber();

  public constructor(@Inject(ConversationsServiceImpl) private conversationsService: ConversationsService) {
  }

  ///////////////////////////////////////////////////////////////////////////
  // Processing the received user from a parent component
  ///////////////////////////////////////////////////////////////////////////

  public get user(): UserModel {
    return this.userSubscriber.model;
  }

  @Input()
  public set user(value: UserModel) {
    this.userSubscriber.model = value;
  }

  ///////////////////////////////////////////////////////////////////////////
  // Processing the received messages from a parent component
  ///////////////////////////////////////////////////////////////////////////

  public get messages(): ConversationMessagesListModel {
    return this.messagesSubscriber.model;
  }

  @Input()
  public set messages(value: ConversationMessagesListModel) {
    this.messagesSubscriber.model = value;
  }

  ///////////////////////////////////////////////////////////////////////////
  // Processing the received conversation from a parent component
  ///////////////////////////////////////////////////////////////////////////

  public get conversation(): ConversationModel {
    return this.conversationSubscriber.model;
  }

  @Input()
  public set conversation(value: ConversationModel) {
    this.conversationSubscriber.model = value;
  }

  ///////////////////////////////////////////////////////////////////////////
  // Interface handlers
  ///////////////////////////////////////////////////////////////////////////

  public ngOnInit(): void {
    this.followUser();
    this.followMessages();
  }

  public ngOnDestroy(): void {
    this.conversationsService.onDispose();
    this.messagesSubscriber.onDispose();
    this.conversationSubscriber.onDispose();
    this.userSubscriber.onDispose();
  }

  public onMessagesSuccess(messages: ConversationMessagesListModel): void {
    this.messagesSubscriber.publish(messages);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  public onMessagesFailed(error: HttpErrorResponse): void {
  }

  public identify(index: number, message: ConversationMessageModel): number {
    return message.conversationMessageId;
  }

  ///////////////////////////////////////////////////////////////////////////
  // Helpers
  ///////////////////////////////////////////////////////////////////////////

  private followUser(): void {
    this.userSubscriber.follow((user: UserModel) => (this.currentUser = user));
  }

  private followMessages(): void {
    this.conversationSubscriber.follow((conversationModel: ConversationModel) => {
      this.currentConversation = conversationModel;
      this.conversationsService.getMessages(new MessagesQuery(this.currentConversation.conversationId, 99), this);
    });
  }
}
