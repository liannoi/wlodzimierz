import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { UserModel } from '@wlodzimierz/domain/src/lib/models/user.model';
import { ConversationModel } from '@wlodzimierz/domain/src/lib/models/conversation.model';
import { ConversationsService } from '@wlodzimierz/application/src/lib/storage/conversations/conversations.service';
import { ConversationsServiceImpl } from '@wlodzimierz/infrastructure/src/lib/storage/conversations/conversations.service';
import { UsersService } from '@wlodzimierz/application/src/lib/storage/users/users.service';
import { UsersServiceImpl } from '@wlodzimierz/infrastructure/src/lib/storage/users/users.service';
import { ConversationsQuery } from '@wlodzimierz/application/src/lib/storage/users/queries/conversations-query';
import { ConversationsNotification } from '@wlodzimierz/application/src/lib/storage/users/notifications/conversations-notification';
import { HttpErrorResponse } from '@angular/common/http';
import { ConversationsListModel } from '@wlodzimierz/domain/src/lib/models/conversations-list.model';
import { UsernameExtractorImpl } from '@wlodzimierz/infrastructure/src/lib/extractors/username.extractor';
import { UsernameExtractor } from '@wlodzimierz/application/src/lib/common/extractors/username.extractor';

@Component({
  selector: 'wlodzimierz-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss']
})
export class ConversationListComponent implements OnInit, ConversationsNotification {

  @Output() conversationChanged: EventEmitter<ConversationModel> = new EventEmitter<ConversationModel>();
  public userModel: UserModel;
  public selectedConversation!: ConversationModel;
  public conversations: ConversationsListModel;
  private userSubject = new BehaviorSubject<UserModel>(new UserModel());

  public constructor(
    @Inject(UsersServiceImpl) private usersService: UsersService,
    @Inject(ConversationsServiceImpl) private conversationsService: ConversationsService,
    @Inject(UsernameExtractorImpl) private usernameExtractor: UsernameExtractor) {
  }

  public get user(): UserModel {
    return this.userSubject.getValue();
  }

  @Input()
  public set user(value: UserModel) {
    this.userSubject.next(value);
  }

  public ngOnInit(): void {
    this.userSubject.subscribe((model: UserModel) => {
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public onConversationsFailed(error: HttpErrorResponse): void {
  }

  public onConversationChanged(conversation: ConversationModel): void {
    this.selectedConversation = conversation;
    this.conversationChanged.emit(conversation);
  }

  public hasBeenSelected(conversation: ConversationModel): boolean {
    return this.selectedConversation?.conversationId === conversation.conversationId;
  }

  public takeUserName(conversation: ConversationModel): string {
    return this.usernameExtractor.extract(conversation, this.user);
  }
}
