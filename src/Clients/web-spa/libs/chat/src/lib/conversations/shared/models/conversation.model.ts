import { User } from '../../../../../../auth/src/lib/shared/models/user.model';

export interface Conversation {
  conversationId: number,
  leftUserId: string,
  leftUser: User,
  rightUserId: string,
  rightUser: User
}

export const defaultConversation = (): Conversation => <Conversation>({});
