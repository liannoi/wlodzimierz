import { HttpErrorResponse } from '@angular/common/http';

import { ConversationsListModel } from '@wlodzimierz/domain/src/lib/models/conversations-list.model';

export interface ConversationsNotification {
  onConversationsSuccess(conversations: ConversationsListModel): void;

  onConversationsFailed(error: HttpErrorResponse): void;
}
