import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import { ConversationsServiceImpl } from '@wlodzimierz/infrastructure/src/lib/storage/conversations/conversations.service';
import { ConversationsService } from '@wlodzimierz/application/src/lib/storage/conversations/conversations.service';
import { ConversationMessagesListModel } from '@wlodzimierz/domain/src/lib/models/conversation-messages-list.model';
import { ConversationModel } from '@wlodzimierz/domain/src/lib/models/conversation.model';
import { UserModel } from '@wlodzimierz/domain/src/lib/models/user.model';
import { VerifyCommand } from '@wlodzimierz/application/src/lib/storage/users/commands/verify.command';
import { AuthFacade } from '@wlodzimierz/application/src/lib/storage/users/auth.facade';
import { AuthFacadeImpl } from '@wlodzimierz/infrastructure/src/lib/storage/users/auth.facade';
import { VerifyNotification } from '@wlodzimierz/domain/src/lib/notifications/users/verify.notification';
import { MessagesQuery } from '@wlodzimierz/application/src/lib/storage/conversations/queries/messages.query';
import { MessagesNotification } from '@wlodzimierz/domain/src/lib/notifications/conversations/messages.notification';

import { AuthRouting } from '../../../auth/auth.routing';

@Component({
  selector: 'wlodzimierz-conversation-message-list',
  templateUrl: './conversation-message-list.component.html',
  styleUrls: ['./conversation-message-list.component.scss']
})
export class ConversationMessageListComponent implements OnInit, OnDestroy, VerifyNotification, MessagesNotification {
  public currentConversation: ConversationModel;
  public currentUser: UserModel;
  private messagesSubject = new BehaviorSubject<ConversationMessagesListModel>(new ConversationMessagesListModel());
  private conversationSubject = new BehaviorSubject<ConversationModel>(new ConversationModel());

  public constructor(
    @Inject(ConversationsServiceImpl) private conversationsService: ConversationsService,
    @Inject(AuthFacadeImpl) private authFacade: AuthFacade,
    private router: Router
  ) {
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
    this.verify();
    this.fetchMessages();
  }

  public ngOnDestroy(): void {
    this.conversationsService.onDispose();
    this.authFacade.onDispose();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public onVerifyFailed(error: HttpErrorResponse): void {
    this.authFacade.clearToken();
    this.router.navigate([AuthRouting.SignIn]);
  }

  public onVerifySuccess(user: UserModel): void {
    this.currentUser = user;
  }

  public onMessagesSuccess(messages: ConversationMessagesListModel): void {
    console.log(messages);
    this.messagesSubject.next(messages);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  public onMessagesFailed(error: HttpErrorResponse): void {
  }

  ///////////////////////////////////////////////////////////////////////////
  // Helpers
  ///////////////////////////////////////////////////////////////////////////

  private verify() {
    this.authFacade.verify(new VerifyCommand(this.authFacade.readToken()), this);
  }

  private fetchMessages() {
    this.conversationSubject.subscribe((model) => {
      this.currentConversation = model;
      this.conversationsService.getMessages(new MessagesQuery(this.currentConversation.conversationId, 99), this);
    });
  }
}
