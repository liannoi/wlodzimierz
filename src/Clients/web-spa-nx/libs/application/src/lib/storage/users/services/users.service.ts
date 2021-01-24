import { UserDetailsNotification } from '@wlodzimierz/application/src/lib/storage/users/notifications/user-details.notification';
import { DetailsQuery } from '@wlodzimierz/application/src/lib/storage/users/queries/details-query';
import { OnDispose } from '@wlodzimierz/application/src/lib/common/on-dispose.interface';
import { ConversationsQuery } from '@wlodzimierz/application/src/lib/storage/users/queries/conversations-query';
import { ConversationsNotification } from '@wlodzimierz/application/src/lib/storage/users/notifications/conversations-notification';

export interface UsersService extends OnDispose {

  getById(request: DetailsQuery, notification: UserDetailsNotification): void;

  getConversations(request: ConversationsQuery, notification: ConversationsNotification): void;
}
