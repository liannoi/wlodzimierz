import { HttpErrorResponse } from '@angular/common/http';

export interface ConversationMessageCreatedNotification {
  onCreatedSuccess(id: number): void;

  onCreatedFailed(error: HttpErrorResponse): void;
}
