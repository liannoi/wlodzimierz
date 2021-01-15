import {UserModel} from '../../models/user.model';

export class SignInCommand {

  public constructor(public user: UserModel) {
  }
}
