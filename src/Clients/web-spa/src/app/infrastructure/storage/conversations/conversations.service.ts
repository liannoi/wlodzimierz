import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {catchError, takeUntil} from 'rxjs/operators';

import {ConversationsService} from '../../../application/storage/conversations/conversations.service';
import {AbstractService} from '../abstract.service';
import {MessagesQuery} from '../../../application/storage/conversations/queries/messages.query';
import {MessagesNotification} from '../../../application/storage/conversations/notifications/messages.notification';
import {ConversationMessagesListModel} from '../../../domain/models/conversation-messages-list.model';
import {ConversationsController} from './conversations.endpoints';

@Injectable()
export class ConversationsServiceImpl extends AbstractService implements ConversationsService {

  public constructor(http: HttpClient) {
    super(http);
  }

  public getAllMessages(request: MessagesQuery, notification: MessagesNotification): void {
    const url = `${ConversationsController}/${request.conversationId}/messages?PageSize=1`;

    this.http.get<ConversationMessagesListModel>(url)
      .pipe(catchError(this.handleError))
      .pipe(takeUntil(this.stop$))
      .subscribe(result => notification.onMessagesSuccess(result), error => notification.onMessagesFailed(error));
  }
}
