import { Component, Inject, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';

import { ConversationMessageModel } from '@wlodzimierz/domain/src/lib/models/conversation-message.model';
import { ConversationsServiceImpl } from '@wlodzimierz/infrastructure/src/lib/storage/conversations/conversations.service';
import { ConversationsService } from '@wlodzimierz/application/src/lib/storage/conversations/conversations.service';
import { MessagesQuery } from '@wlodzimierz/application/src/lib/storage/conversations/queries/messages.query';
import { MessagesNotification } from '@wlodzimierz/application/src/lib/storage/conversations/notifications/messages.notification';
import { ConversationMessagesListModel } from '@wlodzimierz/domain/src/lib/models/conversation-messages-list.model';
import { ConversationModel } from '@wlodzimierz/domain/src/lib/models/conversation.model';

@Component({
  selector: 'wlodzimierz-conversation-message',
  templateUrl: './conversation-message.component.html',
  styleUrls: ['./conversation-message.component.scss']
})
export class ConversationMessageComponent implements OnInit, MessagesNotification {

  public model: ConversationMessageModel;
  private currentConversation: ConversationModel;
  private conversationSubject: BehaviorSubject<ConversationModel> = new BehaviorSubject<ConversationModel>(new ConversationModel());

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
    this.refresh();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onMessagesFailed(error: HttpErrorResponse): void {
  }

  public onMessagesSuccess(messages: ConversationMessagesListModel): void {
    this.model = messages.items[0];
  }

  private refresh(): void {
    this.conversationSubject.subscribe((model: ConversationModel) => {
      this.currentConversation = model;
      this.conversationsService.getMessages(new MessagesQuery(model.conversationId), this);
    });
  }
}
