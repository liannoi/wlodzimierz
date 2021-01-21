import {OnDispose} from '../../common/on-dispose.interface';
import {UserConversationsQuery} from './queries/user-conversations.query';
import {UserConversationsNotification} from './notifications/user-conversations.notification';

export interface ConversationsService extends OnDispose {

  getConversations(request: UserConversationsQuery, notification: UserConversationsNotification): void;
}
