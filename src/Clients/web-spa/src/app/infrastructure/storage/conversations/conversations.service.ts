import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {catchError, takeUntil} from 'rxjs/operators';

import {ConversationsService} from '../../../application/storage/conversations/conversations.service';
import {AbstractService} from '../abstract.service';
import {ConversationsListModel} from '../../../domain/models/conversations-list.model';
import {UsersController} from '../users/users.endpoints';
import {UserConversationsQuery} from '../../../application/storage/conversations/queries/user-conversations.query';
import {UserConversationsNotification} from '../../../application/storage/conversations/notifications/user-conversations.notification';

@Injectable()
export class ConversationsServiceImpl extends AbstractService implements ConversationsService {

  public constructor(http: HttpClient) {
    super(http);
  }

  public getConversations(request: UserConversationsQuery, notification: UserConversationsNotification): void {
    this.http.get<ConversationsListModel>(`${UsersController}/${request.userId}/conversations`)
      .pipe(catchError(this.handleError))
      .pipe(takeUntil(this.stop$))
      .subscribe(result => notification.onUserConversationsSuccess(result), error => notification.onUserConversationsFailed(error));
  }
}
