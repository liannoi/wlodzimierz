import { OnDispose } from '@wlodzimierz/application/src/lib/common/interfaces/dispose.interface';

import { CreateCommand } from '@wlodzimierz/application/src/lib/storage/conversation-messages/commands/create.command';
// eslint-disable-next-line max-len
import { ConversationMessageCreatedNotification } from '@wlodzimierz/application/src/lib/storage/conversation-messages/notifications/conversation-message-created.notification';

export interface ConversationMessagesService extends OnDispose {

  create(request: CreateCommand, notification: ConversationMessageCreatedNotification): void;
}
