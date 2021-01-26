import { UserModel } from '@wlodzimierz/domain/src/lib/models/user.model';
import { ConversationModel } from '@wlodzimierz/domain/src/lib/models/conversation.model';

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

