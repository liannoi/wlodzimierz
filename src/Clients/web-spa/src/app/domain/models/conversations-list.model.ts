import {ConversationModel} from './conversation.model';
import {AbstractPaginatedList} from '../common/abstract-paginated-list.model';

export class ConversationsListModel extends AbstractPaginatedList<ConversationModel> {

  public constructor() {
    super();
  }
}
