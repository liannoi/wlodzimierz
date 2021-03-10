// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserModel } from '../../../../../users/src/lib/shared/models/user.model';

export interface Contact {
  contactId: number;
  ownerUserId: string;
  ownerUser: UserModel;
  contactUserId: string;
  contactUser: UserModel;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
}
