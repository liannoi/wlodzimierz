import {HttpErrorResponse} from '@angular/common/http';
import {ConversationMessagesListModel} from '../../../../domain/models/conversation-messages-list.model';

export interface MessagesNotification {

  onMessagesSuccess(conversations: ConversationMessagesListModel): void;

  onMessagesFailed(error: HttpErrorResponse): void;
}
