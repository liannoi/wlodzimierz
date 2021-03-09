// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserModel } from '../../../../../../shared/storage/src/lib/users/models/user.model';

export interface Contact {
  contactId: number;
  ownerUser: UserModel;
  contactUser: UserModel;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
}
