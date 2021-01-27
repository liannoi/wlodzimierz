import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import { ConversationsServiceImpl } from '@wlodzimierz/infrastructure/src/lib/storage/conversations/conversations.service';
import { ConversationsService } from '@wlodzimierz/application/src/lib/storage/conversations/conversations.service';
import { ConversationMessagesListModel } from '@wlodzimierz/domain/src/lib/models/conversation-messages-list.model';
import { ConversationModel } from '@wlodzimierz/domain/src/lib/models/conversation.model';
import { UserModel } from '@wlodzimierz/domain/src/lib/models/user.model';
import { UsernameExtractorImpl } from '@wlodzimierz/infrastructure/src/lib/extractors/username.extractor';
import { UsernameExtractor } from '@wlodzimierz/application/src/lib/common/extractors/username.extractor';
import { VerifyCommand } from '@wlodzimierz/application/src/lib/storage/users/commands/verify.command';
import { AuthFacade } from '@wlodzimierz/application/src/lib/storage/users/auth.facade';
import { AuthFacadeImpl } from '@wlodzimierz/infrastructure/src/lib/storage/users/auth/auth.facade';
import { VerifyNotification } from '@wlodzimierz/application/src/lib/storage/users/notifications/verify.notification';
import { MessagesQuery } from '@wlodzimierz/application/src/lib/storage/conversations/queries/messages.query';
import { MessagesNotification } from '@wlodzimierz/application/src/lib/storage/conversations/notifications/messages.notification';

import { AuthRouting } from '../../../auth/auth.routing';

@Component({
  selector: 'wlodzimierz-conversation-message-list',
  templateUrl: './conversation-message-list.component.html',
  styleUrls: ['./conversation-message-list.component.scss']
})
export class ConversationMessageListComponent implements OnInit, OnDestroy, VerifyNotification, MessagesNotification {

  private messagesSubject = new BehaviorSubject<ConversationMessagesListModel>(new ConversationMessagesListModel());
  private conversationSubject = new BehaviorSubject<ConversationModel>(new ConversationModel());
  private user: UserModel;
  private conversationModel: ConversationModel;
  private isRefreshed = false;

  public constructor(
    @Inject(ConversationsServiceImpl) private conversationsService: ConversationsService,
    @Inject(UsernameExtractorImpl) private usernameExtractor: UsernameExtractor,
    @Inject(AuthFacadeImpl) private authFacade: AuthFacade,
    private router: Router) {
  }

  public get messages(): ConversationMessagesListModel {
    return this.messagesSubject.getValue();
  }

  @Input()
  public set messages(value: ConversationMessagesListModel) {
    this.messagesSubject.next(value);
  }

  public get conversation(): ConversationModel {
    return this.conversationSubject.getValue();
  }

  @Input()
  public set conversation(value: ConversationModel) {
    this.conversationSubject.next(value);
  }

  public async ngOnInit() {
    if (!this.isRefreshed) {
      this.refresh();
    }
  }

  public ngOnDestroy(): void {
    this.conversationsService.onDispose();
    this.authFacade.onDispose();
  }

  public onVerifyFailed(error: HttpErrorResponse): void {
    this.authFacade.clearToken();
    this.router.navigate([AuthRouting.SignIn]);
  }

  public onVerifySuccess(user: UserModel): void {
    this.user = user;
  }

  public isMyMessage(ownerUserId: string): boolean {
    return ownerUserId === this.user.userId;
  }

  public takeUserName(): string {
    return this.usernameExtractor.extract(this.conversation, this.user);
  }

  public onMessagesSuccess(messages: ConversationMessagesListModel): void {
    console.log(messages);
    this.messagesSubject.next(messages);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onMessagesFailed(error: HttpErrorResponse): void {
  }

  private refresh(): void {
    this.authFacade.verify(new VerifyCommand(this.authFacade.readToken()), this);

    this.conversationSubject.subscribe(model => {
      this.conversationModel = model;
      this.conversationsService.getMessages(new MessagesQuery(this.conversationModel.conversationId, 10), this);
    });
  }
}
