import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { UserModel } from '@wlodzimierz/domain/src/lib/models/user.model';
import { ConversationModel } from '@wlodzimierz/domain/src/lib/models/conversation.model';
import { UsersService } from '@wlodzimierz/application/src/lib/storage/users/users.service';
import { UsersServiceImpl } from '@wlodzimierz/infrastructure/src/lib/storage/users/users.service';
import { ConversationsQuery } from '@wlodzimierz/application/src/lib/storage/users/queries/conversations-query';
import { ConversationsNotification } from '@wlodzimierz/domain/src/lib/notifications/users/conversations-notification';
import { ConversationsListModel } from '@wlodzimierz/domain/src/lib/models/conversations-list.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'wlodzimierz-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss']
})
export class ConversationListComponent implements OnInit, OnDestroy, ConversationsNotification {
  @Output() conversationChanged: EventEmitter<ConversationModel> = new EventEmitter<ConversationModel>();
  public conversations: ConversationsListModel;
  public currentUser: UserModel;
  public currentConversation: ConversationModel;
  private userSubject: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(new UserModel());

  public constructor(@Inject(UsersServiceImpl) private usersService: UsersService) {
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
  // Interface handlers
  ///////////////////////////////////////////////////////////////////////////

  public ngOnInit(): void {
    this.followUser();
  }

  public ngOnDestroy(): void {
    this.usersService.onDispose();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
  public onConversationsFailed(error: HttpErrorResponse): void {
  }

  public onConversationsSuccess(conversations: ConversationsListModel): void {
    this.conversations = conversations;
  }

  ///////////////////////////////////////////////////////////////////////////
  // Ignition events
  ///////////////////////////////////////////////////////////////////////////

  public onConversationChanged(conversation: ConversationModel): void {
    this.currentConversation = conversation;
    this.conversationChanged.emit(conversation);
  }

  ///////////////////////////////////////////////////////////////////////////
  // Helpers
  ///////////////////////////////////////////////////////////////////////////

  private followUser(): void {
    this.userSubject.subscribe((user: UserModel) => {
      this.currentUser = user;
      this.usersService.getConversations(new ConversationsQuery(user?.userId), this);
    });
  }
}
