import { ConversationMessage } from '../../models/conversation-message.model';
import { BaseNotification } from '../../../../../../../shared/notifications/src/lib/common/abstractions/base.notification';

export interface CreatedNotificationHandler extends BaseNotification {
  item: ConversationMessage;
}
