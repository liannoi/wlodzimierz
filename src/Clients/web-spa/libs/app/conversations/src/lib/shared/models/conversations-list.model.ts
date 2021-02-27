import { Conversation } from './conversation.model';

import { AbstractPaginatedList } from '../../../../../../shared/storage/src/lib/common/paging/abstract-paginated-list.model';

export class ConversationsList extends AbstractPaginatedList<Conversation> {
  public constructor() {
    super();
  }
}
