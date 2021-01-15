import {ConversationModel} from '../../../conversations/shared/models/conversation.model';

export class ConversationMessageModel {

  public constructor(
    public conversationMessageId: number = 0,
    public conversation: ConversationModel = new ConversationModel(),
    public ownerUserId: string = '',
    public message: string = '',
    public publish: Date = new Date()) {
  }
}
