import {HttpErrorResponse} from '@angular/common/http';

import {ConversationsListModel} from '../../../../domain/models/conversations-list.model';

export interface ConversationsNotification {

  onConversationsSuccess(conversations: ConversationsListModel): void;

  onConversationsFailed(error: HttpErrorResponse): void;
}
