import { AbstractPaginatedList } from '../../../../../../storage/src/lib/common/paging/abstract-paginated-list.model';
import { Conversation } from './conversation.model';

export class ConversationsList extends AbstractPaginatedList<Conversation> {
  public constructor() {
    super();
  }
}
