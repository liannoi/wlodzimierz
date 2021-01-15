import {ConversationModel} from '../../../conversations/shared/models/conversation.model';

export class CreateCommand {

  public constructor(
    public conversation: ConversationModel = new ConversationModel(),
    public ownerUserId: string = '',
    public message: string = '',
    public publish: Date = new Date()) {
  }
}
