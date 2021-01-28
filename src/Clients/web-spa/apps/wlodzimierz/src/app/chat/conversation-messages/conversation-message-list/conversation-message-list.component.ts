import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';

import { ConversationsServiceImpl } from '@wlodzimierz/infrastructure/src/lib/storage/conversations/conversations.service';
import { ConversationsService } from '@wlodzimierz/application/src/lib/storage/conversations/conversations.service';
import { ConversationMessagesListModel } from '@wlodzimierz/domain/src/lib/models/conversation-messages-list.model';
import { ConversationModel } from '@wlodzimierz/domain/src/lib/models/conversation.model';
import { UserModel } from '@wlodzimierz/domain/src/lib/models/user.model';
import { MessagesQuery } from '@wlodzimierz/application/src/lib/storage/conversations/queries/messages.query';
import { MessagesNotification } from '@wlodzimierz/domain/src/lib/notifications/conversations/messages.notification';

@Component({
  selector: 'wlodzimierz-conversation-message-list',
  templateUrl: './conversation-message-list.component.html',
  styleUrls: ['./conversation-message-list.component.scss']
})
export class ConversationMessageListComponent implements OnInit, OnDestroy, MessagesNotification {
  public currentConversation: ConversationModel;
  public currentUser: UserModel;
  private messagesSubject = new BehaviorSubject<ConversationMessagesListModel>(new ConversationMessagesListModel());
  private conversationSubject = new BehaviorSubject<ConversationModel>(new ConversationModel());
  private userSubject: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(new UserModel());

  public constructor(@Inject(ConversationsServiceImpl) private conversationsService: ConversationsService) {
  }

  ///////////////////////////////////////////////////////////////////////////
  // Processing the received user from a parent component
  ///////////////////////////////////////////////////////////////////////////

  public get user(): UserModel {
    return this.userSubject.getValue();
  }

  @Input()
  public set user(value: UserModel) {
    this.userSubject.next(value);
  }

  ///////////////////////////////////////////////////////////////////////////
  // Processing the received messages from a parent component
  ///////////////////////////////////////////////////////////////////////////

  public get messages(): ConversationMessagesListModel {
    return this.messagesSubject.getValue();
  }

  @Input()
  public set messages(value: ConversationMessagesListModel) {
    this.messagesSubject.next(value);
  }

  ///////////////////////////////////////////////////////////////////////////
  // Processing the received conversation from a parent component
  ///////////////////////////////////////////////////////////////////////////

  public get conversation(): ConversationModel {
    return this.conversationSubject.getValue();
  }

  @Input()
  public set conversation(value: ConversationModel) {
    this.conversationSubject.next(value);
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
  }

  public onMessagesSuccess(messages: ConversationMessagesListModel): void {
    this.messagesSubject.next(messages);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  public onMessagesFailed(error: HttpErrorResponse): void {
  }

  ///////////////////////////////////////////////////////////////////////////
  // Helpers
  ///////////////////////////////////////////////////////////////////////////

  private followUser(): void {
    this.userSubject.subscribe((user: UserModel) => (this.currentUser = user));
  }

  private followMessages(): void {
    this.conversationSubject.subscribe((conversationModel: ConversationModel) => {
      this.currentConversation = conversationModel;
      this.conversationsService.getMessages(new MessagesQuery(this.currentConversation.conversationId, 99), this);
    });
  }
}
