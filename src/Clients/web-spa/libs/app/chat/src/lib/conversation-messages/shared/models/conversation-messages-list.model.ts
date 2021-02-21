import { AbstractPaginatedList } from '../../../../../../storage/src/lib/common/paging/abstract-paginated-list.model';
import { ConversationMessage } from './conversation-message.model';

export class ConversationMessagesList extends AbstractPaginatedList<ConversationMessage> {
  public constructor() {
    super();
  }
}
