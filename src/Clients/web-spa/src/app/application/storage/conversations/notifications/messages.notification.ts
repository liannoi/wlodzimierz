import {HttpErrorResponse} from '@angular/common/http';

import {ConversationsListModel} from '../../../../domain/models/conversations-list.model';
import {ConversationMessagesListModel} from '../../../../domain/models/conversation-messages-list.model';

export interface MessagesNotification {

  onMessagesSuccess(conversations: ConversationMessagesListModel): void;

  onMessagesFailed(error: HttpErrorResponse): void;
}
