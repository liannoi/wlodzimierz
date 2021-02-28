import { Contact } from './contact.model';
import { AbstractPaginatedList } from '../../../../../../shared/storage/src/lib/common/paging/abstract-paginated-list.model';

export class ContactsList extends AbstractPaginatedList<Contact> {
  public constructor() {
    super();
  }
}
