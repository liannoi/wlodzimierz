import {ConversationModel} from './conversation.model';
import {UserModel} from './user.model';

export class ConversationMessageModel {
  public constructor(
    public conversationMessageId: number = 0,
    public conversation: ConversationModel = new ConversationModel(),
    public ownerUserId: string = '',
    public ownerUser: UserModel = new UserModel(),
    public message: string = '',
    public publish: Date = new Date()) {
  }
}
