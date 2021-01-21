import {HttpErrorResponse} from '@angular/common/http';

import {ConversationsListModel} from '../../../../domain/models/conversations-list.model';

export interface UserConversationsNotification {

  onUserConversationsSuccess(conversations: ConversationsListModel): void;

  onUserConversationsFailed(error: HttpErrorResponse): void;
}
