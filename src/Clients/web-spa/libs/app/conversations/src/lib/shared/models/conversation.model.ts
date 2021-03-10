// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserModel } from '../../../../../users/src/lib/shared/models/user.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ConversationMessage } from '../../../../../conversation-messages/src/lib/shared/models/conversation-message.model';

export interface Conversation {
  conversationId: number;
  leftUserId: string;
  leftUser: UserModel;
  rightUserId: string;
  rightUser: UserModel;
  lastMessage: ConversationMessage;
}
