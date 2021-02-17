import { Conversation } from '../../../conversations/shared/models/conversation.model';
import { User } from '../../../../../../users/src/lib/shared/models/user.model';

export interface ConversationMessage {
  conversationMessageId: number,
  conversation: Conversation,
  ownerUserId: string,
  ownerUser: User,
  message: string,
  publish: Date,
}
