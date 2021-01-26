import { ConversationMessageModel } from '@wlodzimierz/domain/src/lib/models/conversation-message.model';
import { AbstractPaginatedList } from '@wlodzimierz/domain/src/lib/common/abstract-paginated.list';

export class ConversationMessagesListModel extends AbstractPaginatedList<ConversationMessageModel> {
  public constructor() {
    super();
  }
}

