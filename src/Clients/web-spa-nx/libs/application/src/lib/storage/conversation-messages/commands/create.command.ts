import { ConversationMessageModel } from '@wlodzimierz/domain/src/lib/models/conversation-message.model';

export class CreateCommand {

  public constructor(public model: ConversationMessageModel = new ConversationMessageModel()) {
  }
}
