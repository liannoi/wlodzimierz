import {HttpErrorResponse} from '@angular/common/http';

import {ConversationsListModel} from '../../../../conversations/shared/models/conversations-list.model';

export interface OnConversationsHandler {

  onConversationsFetchedSuccess(conversations: ConversationsListModel): void;

  onConversationsFetchedFailed(error: HttpErrorResponse): void;
}
