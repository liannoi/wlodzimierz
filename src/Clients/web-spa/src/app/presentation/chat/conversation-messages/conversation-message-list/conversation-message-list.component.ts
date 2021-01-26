import {Component, Inject, Input, OnInit} from '@angular/core';

import {ConversationMessagesListModel} from '../../../../domain/models/conversation-messages-list.model';
import {UserModel} from '../../../../domain/models/user.model';
import {ConversationModel} from '../../../../domain/models/conversation.model';
import {BehaviorSubject} from 'rxjs';
import {ConversationsServiceImpl} from '../../../../infrastructure/storage/conversations/conversations.service';
import {ConversationsService} from '../../../../application/storage/conversations/conversations.service';

@Component({
  selector: 'app-conversation-message-list',
  templateUrl: './conversation-message-list.component.html',
  styleUrls: ['./conversation-message-list.component.scss']
})
export class ConversationMessageListComponent implements OnInit {

  public messagesList!: ConversationMessagesListModel;
  public user!: UserModel;
  public conversationModel!: ConversationModel;

  private messagesSubject = new BehaviorSubject<ConversationMessagesListModel>(new ConversationMessagesListModel());
  private conversationSubject = new BehaviorSubject<ConversationModel>(new ConversationModel());

  public constructor(@Inject(ConversationsServiceImpl) private conversationsService: ConversationsService) {
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

  public ngOnInit(): void {
    const isRefreshed = false;

    if (!isRefreshed) {
      this.refresh();
    }
  }

  public isMyMessage(ownerUserId: string): boolean {
    return ownerUserId === this.user.userId;
  }

  public takeUserName(): string {
    return this.conversationsService.takeUserName(this.conversation, this.user);
  }

  private refresh(): void {
  }
}
