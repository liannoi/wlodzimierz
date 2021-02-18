import { ConversationMessage } from '../models/conversation-message.model';
import { BaseNotification } from '../../../../../../notifications/src/lib/abstractions/base.notification';

export interface CreatedNotification extends BaseNotification {
  item: ConversationMessage;
}
