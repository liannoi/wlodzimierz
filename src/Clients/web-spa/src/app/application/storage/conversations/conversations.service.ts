import {OnDispose} from '../../common/on-dispose.interface';
import {MessagesQuery} from './queries/messages.query';
import {MessagesNotification} from './notifications/messages.notification';

export interface ConversationsService extends OnDispose {

  getAllMessages(request: MessagesQuery, notification: MessagesNotification): void;
}
