import { ConversationModel } from '@wlodzimierz/domain/src/lib/models/conversation.model';
import { AbstractPaginatedList } from '@wlodzimierz/domain/src/lib/common/abstract-paginated.list';

export class ConversationsListModel extends AbstractPaginatedList<ConversationModel> {

  public constructor() {
    super();
  }
}

