import { UserModel } from '@wlodzimierz/domain/src/lib/models/user.model';

export class SignInCommand {
  public constructor(public user: UserModel) {
  }
}
