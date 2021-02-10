import { User } from '../../../../../auth/src/lib/shared/models/user.model';
import { Conversation } from '../../conversations/shared/models/conversation.model';

export interface ConversationMessage {
  conversationMessageId: number,
  conversation: Conversation,
  ownerUserId: string,
  ownerUser: User,
  message: string,
  publish: Date,
}

export const defaultConversationMessage = (): ConversationMessage => <ConversationMessage>({});
