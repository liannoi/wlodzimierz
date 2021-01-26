import {OnDispose} from '../../common/on-dispose.interface';
import {MessagesQuery} from './queries/messages.query';
import {MessagesNotification} from './notifications/messages.notification';
import {UserModel} from '../../../domain/models/user.model';
import {ConversationModel} from '../../../domain/models/conversation.model';

export interface ConversationsService extends OnDispose {

  getAllMessages(request: MessagesQuery, notification: MessagesNotification): void;

  takeUserName(conversation: ConversationModel, user: UserModel): string;
}
