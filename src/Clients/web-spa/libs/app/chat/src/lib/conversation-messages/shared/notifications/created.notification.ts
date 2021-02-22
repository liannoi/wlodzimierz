import { ConversationMessage } from '../models/conversation-message.model';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { BaseNotification } from '../../../../../../../shared/notifications/src/lib/common/abstractions/base.notification';

export interface CreatedNotification extends BaseNotification {
  item: ConversationMessage;
}
