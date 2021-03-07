import { AbstractPaginatedList } from '../../common/paging/abstract-paginated-list.model';
import { UserModel } from './user.model';

export class UsersList extends AbstractPaginatedList<UserModel> {
  public constructor() {
    super();
  }
}
