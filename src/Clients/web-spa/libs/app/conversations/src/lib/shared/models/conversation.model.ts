import { UserModel } from '../../../../../../shared/storage/src/lib/users/models/user.model';
import { ConversationMessage } from '../../../../../conversation-messages/src/lib/shared/models/conversation-message.model';

export interface Conversation {
  conversationId: number;
  leftUserId: string;
  leftUser: UserModel;
  rightUserId: string;
  rightUser: UserModel;
  lastMessage: ConversationMessage;
}
