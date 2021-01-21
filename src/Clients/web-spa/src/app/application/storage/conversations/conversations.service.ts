import {OnDispose} from '../../common/on-dispose.interface';
import {UserConversationsQuery} from './queries/user-conversations.query';
import {UserConversationsNotification} from './notifications/user-conversations.notification';
import {MessagesQuery} from './queries/messages.query';
import {MessagesNotification} from './notifications/messages.notification';

export interface ConversationsService extends OnDispose {

  getAllMessages(request: MessagesQuery, notification: MessagesNotification): void;

  getUserConversations(request: UserConversationsQuery, notification: UserConversationsNotification): void;
}
