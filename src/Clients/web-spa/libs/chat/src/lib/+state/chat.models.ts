import { ConversationMessage } from '../conversation-messages/shared/conversation-message.model';
import { ConversationMessagesList } from '../conversation-messages/shared/conversation-messages-list.model';
import { Conversation } from '../conversations/shared/models/conversation.model';

export interface ChatState {
  currentConversation: Conversation,
  allMessages: ConversationMessagesList,
  lastMessage: ConversationMessage,
}
