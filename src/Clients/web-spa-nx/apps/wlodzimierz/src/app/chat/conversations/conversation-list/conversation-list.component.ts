import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { UserModel } from '@wlodzimierz/domain/src/lib/models/user.model';
import { ConversationModel } from '@wlodzimierz/domain/src/lib/models/conversation.model';
import { ConversationsService } from '@wlodzimierz/application/src/lib/storage/conversations/conversations.service';
import { ConversationsServiceImpl } from '@wlodzimierz/infrastructure/src/lib/storage/conversations/conversations.service';
import { UsersService } from '@wlodzimierz/application/src/lib/storage/users/users.service';
import { UsersServiceImpl } from '@wlodzimierz/infrastructure/src/lib/storage/users/users.service';
import { ConversationsQuery } from '@wlodzimierz/application/src/lib/storage/users/queries/conversations-query';
import { ConversationsNotification } from '@wlodzimierz/application/src/lib/storage/users/notifications/conversations-notification';
import { ConversationsListModel } from '@wlodzimierz/domain/src/lib/models/conversations-list.model';
import { AuthFacade } from '@wlodzimierz/application/src/lib/storage/users/auth.facade';
import { AuthFacadeImpl } from '@wlodzimierz/infrastructure/src/lib/storage/users/auth/auth.facade';
import { VerifyCommand } from '@wlodzimierz/application/src/lib/storage/users/commands/verify.command';
import { VerifyNotification } from '@wlodzimierz/application/src/lib/storage/users/notifications/verify.notification';

@Component({
  selector: 'wlodzimierz-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss']
})
export class ConversationListComponent implements OnInit, OnDestroy, ConversationsNotification, VerifyNotification {

  @Output() conversationChanged: EventEmitter<ConversationModel> = new EventEmitter<ConversationModel>();
  public conversations: ConversationsListModel;
  public currentConversation: ConversationModel;
  public currentUser: UserModel;

  public constructor(
    @Inject(AuthFacadeImpl) private authFacade: AuthFacade,
    @Inject(UsersServiceImpl) private usersService: UsersService,
    @Inject(ConversationsServiceImpl) private conversationsService: ConversationsService) {
  }

  public ngOnInit(): void {
    this.authFacade.verify(new VerifyCommand(this.authFacade.readToken()), this);
  }

  public ngOnDestroy(): void {
    this.usersService.onDispose();
    this.conversationsService.onDispose();
    this.authFacade.onDispose();
  }

  public onConversationChanged(conversation: ConversationModel): void {
    this.currentConversation = conversation;
    this.conversationChanged.emit(conversation);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  public onVerifyFailed(error: HttpErrorResponse): void {
  }

  public onVerifySuccess(user: UserModel): void {
    this.currentUser = user;
    this.usersService.getConversations(new ConversationsQuery(user.userId), this);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
  public onConversationsFailed(error: HttpErrorResponse): void {
  }

  public onConversationsSuccess(conversations: ConversationsListModel): void {
    this.conversations = conversations;
  }
}
