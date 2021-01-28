import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ConversationMessageModel } from '@wlodzimierz/domain/src/lib/models/conversation-message.model';
import { ConversationsServiceImpl } from '@wlodzimierz/infrastructure/src/lib/storage/conversations/conversations.service';
import { ConversationsService } from '@wlodzimierz/application/src/lib/storage/conversations/conversations.service';
import { MessagesQuery } from '@wlodzimierz/application/src/lib/storage/conversations/queries/messages.query';
import { MessagesNotification } from '@wlodzimierz/domain/src/lib/notifications/conversations/messages.notification';
import { ConversationMessagesListModel } from '@wlodzimierz/domain/src/lib/models/conversation-messages-list.model';
import { ConversationModel } from '@wlodzimierz/domain/src/lib/models/conversation.model';
import { ConversationSubscriber } from '@wlodzimierz/application/src/lib/storage/conversations/subscribers/conversation.subscriber';

@Component({
  selector: 'wlodzimierz-conversation-message-last',
  templateUrl: './conversation-message-last.component.html',
  styleUrls: ['./conversation-message-last.component.scss']
})
export class ConversationMessageLastComponent implements OnInit, OnDestroy, MessagesNotification {
  public currentMessage: ConversationMessageModel;
  private currentConversation: ConversationModel;
  private conversationSubscriber: ConversationSubscriber = new ConversationSubscriber();

  public constructor(@Inject(ConversationsServiceImpl) private conversationsService: ConversationsService) {
  }

  ///////////////////////////////////////////////////////////////////////////
  // Processing the received conversation from a parent component
  ///////////////////////////////////////////////////////////////////////////

  public get conversation(): ConversationModel {
    return this.conversationSubscriber.model;
  }

  @Input()
  public set conversation(value: ConversationModel) {
    this.conversationSubscriber.model = value;
  }

  ///////////////////////////////////////////////////////////////////////////
  // Interface handlers
  ///////////////////////////////////////////////////////////////////////////

  public ngOnInit(): void {
    this.followMessages();
  }

  public ngOnDestroy(): void {
    this.conversationsService.onDispose();
    this.conversationSubscriber.onDispose();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  public onMessagesFailed(error: HttpErrorResponse): void {
  }

  public onMessagesSuccess(messages: ConversationMessagesListModel): void {
    this.currentMessage = messages.items[0];
  }

  ///////////////////////////////////////////////////////////////////////////
  // Helpers
  ///////////////////////////////////////////////////////////////////////////

  private followMessages(): void {
    this.conversationSubscriber.follow((model: ConversationModel) => {
      this.currentConversation = model;
      this.conversationsService.getMessages(new MessagesQuery(model.conversationId), this);
    });
  }
}
