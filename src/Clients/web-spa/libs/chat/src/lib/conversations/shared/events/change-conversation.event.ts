import { Conversation } from '../models/conversation.model';

export interface ChangeConversationEvent {
  conversation: Conversation;
}
