import { Component, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ConversationMessageModel } from '@wlodzimierz/domain/src/lib/models/conversation-message.model';
import { ConversationsServiceImpl } from '@wlodzimierz/infrastructure/src/lib/storage/conversations/conversations.service';
import { ConversationsService } from '@wlodzimierz/application/src/lib/storage/conversations/conversations.service';
import { MessagesQuery } from '@wlodzimierz/application/src/lib/storage/conversations/queries/messages.query';
import { MessagesNotification } from '@wlodzimierz/application/src/lib/storage/conversations/notifications/messages.notification';
import { ConversationMessagesListModel } from '@wlodzimierz/domain/src/lib/models/conversation-messages-list.model';

@Component({
  selector: 'wlodzimierz-conversation-message',
  templateUrl: './conversation-message.component.html',
  styleUrls: ['./conversation-message.component.scss']
})
export class ConversationMessageComponent implements MessagesNotification {

  public model: ConversationMessageModel;

  public constructor(@Inject(ConversationsServiceImpl) private conversationsService: ConversationsService) {
    conversationsService.getMessages(new MessagesQuery(2), this);
  }

  public onMessagesFailed(error: HttpErrorResponse): void {
  }

  public onMessagesSuccess(messages: ConversationMessagesListModel): void {
    console.log(messages);
  }
}
