import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

import {BehaviorSubject} from 'rxjs';

import {ConversationsListModel} from '../../../domain/models/conversations-list.model';
import {UserModel} from '../../../domain/models/user.model';
import {ConversationModel} from '../../../domain/models/conversation.model';
import {ConversationsQuery} from '../../../application/storage/users/queries/conversations.query';
import {ConversationsNotification} from '../../../application/storage/users/notifications/conversations.notification';
import {UsersServiceImpl} from '../../../infrastructure/storage/users/services/users.service';
import {UsersService} from '../../../application/storage/users/services/users.service';

@Component({
  selector: 'app-user-conversations',
  templateUrl: './user-conversations.component.html',
  styleUrls: ['./user-conversations.component.scss']
})
export class UserConversationsComponent implements OnInit, ConversationsNotification {

  public conversations!: ConversationsListModel;
  public userModel!: UserModel;
  public selectedConversation!: ConversationModel;
  @Output() conversationChanged: EventEmitter<ConversationModel> = new EventEmitter<ConversationModel>();
  private userSubject = new BehaviorSubject<UserModel>(new UserModel());

  public constructor(@Inject(UsersServiceImpl) private usersService: UsersService) {
  }

  public get user(): UserModel {
    return this.userSubject.getValue();
  }

  @Input()
  public set user(value: UserModel) {
    this.userSubject.next(value);
  }

  public ngOnInit(): void {
    this.userSubject.subscribe(model => {
      if (!model) {
        return;
      }

      this.userModel = model;
      this.usersService.getConversations(new ConversationsQuery(model.userId), this);
    });
  }

  public onConversationsSuccess(conversations: ConversationsListModel): void {
    this.conversations = conversations;
  }

  public onConversationsFailed(error: HttpErrorResponse): void {
  }

  public onConversationChanged(conversation: ConversationModel): void {
    this.selectedConversation = conversation;
    this.conversationChanged.emit(conversation);
  }

  public isThisSelected(conversation: ConversationModel): boolean {
    return this.selectedConversation?.conversationId === conversation.conversationId;
  }

  public takeUser(conversation: ConversationModel): UserModel {
    return conversation.rightUserId === this.userModel.userId ? conversation.leftUser : conversation.rightUser;
  }
}
