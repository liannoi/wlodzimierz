import { ConversationMessage } from '../models/conversation-message.model';

export interface CreateEvent {
  message: ConversationMessage;
}
