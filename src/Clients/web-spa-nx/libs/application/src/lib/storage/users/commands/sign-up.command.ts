import { UserModel } from '@wlodzimierz/domain/src/lib/models/user.model';

export class SignUpCommand {

  public constructor(public user: UserModel) {
  }
}
