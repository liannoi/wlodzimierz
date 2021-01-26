import {OnDispose} from '../../../common/on-dispose.interface';
import {DetailsQuery} from '../queries/details.query';
import {UserDetailsNotification} from '../notifications/user-details.notification';
import {ConversationsQuery} from '../queries/conversations.query';
import {ConversationsNotification} from '../notifications/conversations.notification';

export interface UsersService extends OnDispose {

  getById(request: DetailsQuery, notification: UserDetailsNotification): void;

  getConversations(request: ConversationsQuery, notification: ConversationsNotification): void;
}
