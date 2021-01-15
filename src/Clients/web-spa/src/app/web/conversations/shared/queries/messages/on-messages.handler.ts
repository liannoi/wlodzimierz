import {HttpErrorResponse} from '@angular/common/http';

import {ConversationMessagesListModel} from '../../../../conversation-messages/shared/models/conversation-messages-list.model';

export interface OnMessagesHandler {

  onMessagesFetchedSuccess(messages: ConversationMessagesListModel): void;

  onMessagesFetchedFailed(error: HttpErrorResponse): void;
}
