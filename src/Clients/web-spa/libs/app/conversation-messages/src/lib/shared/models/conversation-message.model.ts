import { Conversation } from '../../../../../conversations/src/lib/shared/models/conversation.model';
import { UserModel } from '../../../../../../shared/storage/src/lib/users/models/user.model';

export interface ConversationMessage {
  conversationMessageId: number;
  conversation: Conversation;
  ownerUserId: string;
  ownerUser: UserModel;
  message: string;
  publish: Date;
}
