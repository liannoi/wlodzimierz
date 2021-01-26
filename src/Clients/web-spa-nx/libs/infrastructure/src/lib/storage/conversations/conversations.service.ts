import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, takeUntil } from 'rxjs/operators';

import { ConversationsService } from '@wlodzimierz/application/src/lib/storage/conversations/conversations.service';
import { MessagesQuery } from '@wlodzimierz/application/src/lib/storage/conversations/queries/messages.query';
import { MessagesNotification } from '@wlodzimierz/application/src/lib/storage/conversations/notifications/messages.notification';
import { AbstractService } from '@wlodzimierz/infrastructure/src/lib/common/services/abstract.service';
import { ConversationsEndpointBuilder } from '@wlodzimierz/infrastructure/src/lib/storage/conversations/conversations-endpoint.builder';
import { ConversationMessagesListModel } from '@wlodzimierz/domain/src/lib/models/conversation-messages-list.model';

@Injectable()
export class ConversationsServiceImpl extends AbstractService implements ConversationsService {

  public constructor(http: HttpClient, private endpointBuilder: ConversationsEndpointBuilder) {
    super(http);
  }

  public getMessages(request: MessagesQuery, notification: MessagesNotification): void {
    const endpoint = this.endpointBuilder
      .withParameter(request.conversationId.toString())
      .withAction('messages')
      .withPageSize(request.pageSize)
      .build();

    this.http.get<ConversationMessagesListModel>(endpoint.url)
      .pipe(catchError(this.handleError))
      .pipe(takeUntil(this.stop$))
      .subscribe(result => notification.onMessagesSuccess(result), error => notification.onMessagesFailed(error));
  }
}
