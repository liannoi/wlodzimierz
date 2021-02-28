import { Conversation } from '../../../../../conversations/src/lib/shared/models/conversation.model';
import { UserModel } from '../../../../../users/src/lib/shared/models/user.model';

export interface ConversationMessage {
  conversationMessageId: number;
  conversation: Conversation;
  ownerUserId: string;
  ownerUser: UserModel;
  message: string;
  publish: Date;
}
