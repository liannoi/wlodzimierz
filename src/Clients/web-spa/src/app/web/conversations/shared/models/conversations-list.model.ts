import {ConversationModel} from './conversation.model';
import {AbstractPaginatedList} from '../../../../shared/abstract-paginated-list.model';

export class ConversationsListModel extends AbstractPaginatedList<ConversationModel> {

  public constructor() {
    super();
  }
}
