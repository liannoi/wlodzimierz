import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

import {BehaviorSubject} from 'rxjs';

import {ConversationsListModel} from '../../../domain/models/conversations-list.model';
import {UserModel} from '../../../domain/models/user.model';
import {ConversationModel} from '../../../domain/models/conversation.model';
import {ConversationsService} from '../../../application/storage/conversations/conversations.service';
import {ConversationsServiceImpl} from '../../../infrastructure/storage/conversations/conversations.service';
import {UserConversationsQuery} from '../../../application/storage/conversations/queries/user-conversations.query';
import {UserConversationsNotification} from '../../../application/storage/conversations/notifications/user-conversations.notification';
import {UsersServiceImpl} from '../../../infrastructure/storage/users/services/users.service';
import {UsersService} from '../../../application/storage/users/services/users.service';

@Component({
  selector: 'app-user-conversations',
  templateUrl: './user-conversations.component.html',
  styleUrls: ['./user-conversations.component.scss']
})
export class UserConversationsComponent implements OnInit, UserConversationsNotification {

  public conversations!: ConversationsListModel;
  public userModel!: UserModel;
  public selectedConversation!: ConversationModel;
  @Output() conversationChanged: EventEmitter<ConversationModel> = new EventEmitter<ConversationModel>();
  private userSubject = new BehaviorSubject<UserModel>(new UserModel());

  public constructor(
    @Inject(ConversationsServiceImpl) private conversationsService: ConversationsService,
    @Inject(UsersServiceImpl) private usersService: UsersService) {
  }

  public get user(): UserModel {
    return this.userSubject.getValue();
  }

  @Input()
  public set user(value) {
    this.userSubject.next(value);
  }

  public ngOnInit(): void {
    this.userSubject.subscribe(model => {
      if (!model) {
        return;
      }

      this.userModel = model;
      this.conversationsService.getUserConversations(new UserConversationsQuery(model.userId), this);
    });
  }

  public onUserConversationsSuccess(conversations: ConversationsListModel): void {
    this.conversations = conversations;
  }

  public onUserConversationsFailed(error: HttpErrorResponse): void {
  }

  public onConversationChanged(conversation: ConversationModel): void {
    this.selectedConversation = conversation;
    this.conversationChanged.emit(conversation);
  }

  public isThisSelected(conversation: ConversationModel): boolean {
    return this.selectedConversation?.conversationId === conversation.conversationId;
  }

  public conversationUser(conversation: ConversationModel): UserModel {
    return conversation.rightUserId === this.userModel.userId ? conversation.leftUser : conversation.rightUser;
  }
}
