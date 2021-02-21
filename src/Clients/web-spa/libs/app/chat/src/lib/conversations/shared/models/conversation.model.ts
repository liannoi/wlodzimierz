import { User } from '../../../../../../users/src/lib/shared/models/user.model';
import { ConversationMessage } from '../../../conversation-messages/shared/models/conversation-message.model';

export interface Conversation {
  conversationId: number;
  leftUserId: string;
  leftUser: User;
  rightUserId: string;
  rightUser: User;
  lastMessage: ConversationMessage;
}
