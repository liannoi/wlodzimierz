import { AbstractPaginatedList } from '../../../../../../shared/storage/src/lib/common/paging/abstract-paginated-list.model';
import { UserModel } from './user.model';

export class UsersList extends AbstractPaginatedList<UserModel> {
  public constructor() {
    super();
  }
}
