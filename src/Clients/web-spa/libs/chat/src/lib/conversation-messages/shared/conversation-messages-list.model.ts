import { AbstractPaginatedList } from '../../../../../storage/src/lib/common/paging/abstract-paginated-list.model';
import { ConversationMessage } from './conversation-message.model';

export type ConversationMessagesList = AbstractPaginatedList<ConversationMessage>

export const defaultConversationMessagesList = (): ConversationMessagesList => <ConversationMessagesList>({});
