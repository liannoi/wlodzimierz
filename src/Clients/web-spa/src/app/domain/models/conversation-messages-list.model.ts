import {AbstractPaginatedList} from '../common/abstract-paginated-list.model';
import {ConversationMessageModel} from './conversation-message.model';


export class ConversationMessagesListModel extends AbstractPaginatedList<ConversationMessageModel> {

  public constructor() {
    super();
  }
}
