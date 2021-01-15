import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {catchError, takeUntil} from 'rxjs/operators';

import {AbstractService} from '../../shared/abstract.service';
import {ApiEndpoints} from '../../shared/api.constants';
import {OnMessagesHandler} from './shared/queries/messages/on-messages.handler';
import {MessagesQuery} from './shared/queries/messages/messages.query';
import {ConversationMessagesListModel} from '../conversation-messages/shared/models/conversation-messages-list.model';

@Injectable()
export class ConversationsService extends AbstractService {

  public constructor(http: HttpClient) {
    super(http);
  }

  public getAllMessages(request: MessagesQuery, handler: OnMessagesHandler) {
    this.http.get<ConversationMessagesListModel>(`${ApiEndpoints.ConversationMessages}`,
      {params: {ConversationId: request.conversationId.toString()}})
      .pipe(catchError(this.handleError))
      .pipe(takeUntil(this.stop$))
      .subscribe(messages => handler.onMessagesFetchedSuccess(messages), error => handler.onMessagesFetchedFailed(error));
  }
}
