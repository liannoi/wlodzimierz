import {Component, Inject, Input, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

import {BehaviorSubject} from 'rxjs';

import {ConversationMessageModel} from '../../../../domain/models/conversation-message.model';
import {ConversationModel} from '../../../../domain/models/conversation.model';
import {ConversationsService} from '../../../../application/storage/conversations/conversations.service';
import {ConversationsServiceImpl} from '../../../../infrastructure/storage/conversations/conversations.service';
import {MessagesQuery} from '../../../../application/storage/conversations/queries/messages.query';
import {MessagesNotification} from '../../../../application/storage/conversations/notifications/messages.notification';
import {ConversationMessagesListModel} from '../../../../domain/models/conversation-messages-list.model';

@Component({
  selector: 'app-conversation-message',
  templateUrl: './conversation-message.component.html',
  styleUrls: ['./conversation-message.component.scss']
})
export class ConversationMessageComponent implements OnInit, MessagesNotification {

  public message!: ConversationMessageModel;
  private currentConversation!: ConversationModel;
  private conversationSubject = new BehaviorSubject<ConversationModel>(new ConversationModel());

  public constructor(@Inject(ConversationsServiceImpl) private conversationsService: ConversationsService) {
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

  public onMessagesFailed(error: HttpErrorResponse): void {
  }

  public onMessagesSuccess(conversations: ConversationMessagesListModel): void {
    this.message = conversations.items[0];
  }

  private refresh(): void {
    this.conversationSubject.subscribe(model => {
      if (!model) {
        return;
      }

      this.currentConversation = model;
      console.log(model);
      this.conversationsService.getAllMessages(new MessagesQuery(model.conversationId), this);
    });
  }
}
