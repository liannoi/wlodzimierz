// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserModel } from '../../../../../users/src/lib/shared/models/user.model';

export interface Contact {
  contactId: number;
  ownerUser: UserModel;
  contactUser: UserModel;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
}
