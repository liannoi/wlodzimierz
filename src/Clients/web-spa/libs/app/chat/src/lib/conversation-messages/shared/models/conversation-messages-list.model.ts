import { ConversationMessage } from './conversation-message.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AbstractPaginatedList } from '../../../../../../../shared/storage/src/lib/common/paging/abstract-paginated-list.model';

export class ConversationMessagesList extends AbstractPaginatedList<ConversationMessage> {
  public constructor() {
    super();
  }
}
