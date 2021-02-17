import { ConversationMessage } from '../models/conversation-message.model';

export interface CreateConversationMessageEvent {
  message: ConversationMessage;
}
