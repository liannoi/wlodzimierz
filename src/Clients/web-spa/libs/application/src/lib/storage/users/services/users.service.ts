import { DetailsNotification } from '@wlodzimierz/domain/src/lib/notifications/users/details.notification';
import { DetailsQuery } from '@wlodzimierz/application/src/lib/storage/users/queries/details-query';
import { OnDispose } from '@wlodzimierz/application/src/lib/common/interfaces/dispose.interface';
import { ConversationsQuery } from '@wlodzimierz/application/src/lib/storage/users/queries/conversations-query';
import { ConversationsNotification } from '@wlodzimierz/domain/src/lib/notifications/users/conversations-notification';

export interface UsersService extends OnDispose {
  getById(request: DetailsQuery, notification: DetailsNotification): void;

  getConversations(request: ConversationsQuery, notification: ConversationsNotification): void;
}
