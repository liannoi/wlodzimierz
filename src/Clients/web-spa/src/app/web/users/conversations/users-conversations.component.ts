import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

import {BehaviorSubject} from 'rxjs';

import {UsersService} from '../shared/users.service';
import {ConversationsListModel} from '../../conversations/shared/models/conversations-list.model';
import {UserModel} from '../../../auth/core/models/user.model';
import {ConversationModel} from '../../conversations/shared/models/conversation.model';
import {ConversationsQuery} from '../shared/queries/conversations/conversations.query';
import {OnConversationsHandler} from '../shared/queries/conversations/on-conversations.hander';

@Component({
  selector: 'app-users-conversations',
  templateUrl: './users-conversations.component.html',
  styleUrls: ['./users-conversations.component.scss']
})
export class UsersConversationsComponent implements OnInit, OnConversationsHandler {

  public conversations: ConversationsListModel = new ConversationsListModel();
  public userModel!: UserModel;
  public selectedConversation!: ConversationModel;

  @Output() public conversationChanged: EventEmitter<ConversationModel> = new EventEmitter<ConversationModel>();

  private userSubject = new BehaviorSubject<UserModel>(new UserModel());

  public constructor(private usersService: UsersService) {
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
      this.usersService.getConversations(new ConversationsQuery(model.userId), this);
    });
  }

  public onConversationsFetchedFailed(error: HttpErrorResponse): void {
  }

  public onConversationsFetchedSuccess(conversations: ConversationsListModel): void {
    this.conversations = conversations;
  }

  public isThisSelected(conversation: ConversationModel) {
    return this.selectedConversation?.conversationId === conversation.conversationId;
  }

  public onConversationChanged(conversation: ConversationModel) {
    this.selectedConversation = conversation;
    this.conversationChanged.emit(conversation);
  }
}
