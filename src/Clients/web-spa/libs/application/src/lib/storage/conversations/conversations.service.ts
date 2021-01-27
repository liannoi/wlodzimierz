import { OnDispose } from '@wlodzimierz/application/src/lib/common/interfaces/dispose.interface';
import { MessagesQuery } from '@wlodzimierz/application/src/lib/storage/conversations/queries/messages.query';
import { MessagesNotification } from '@wlodzimierz/domain/src/lib/notifications/conversations/messages.notification';

export interface ConversationsService extends OnDispose {
  getMessages(request: MessagesQuery, notification: MessagesNotification): void;
}
