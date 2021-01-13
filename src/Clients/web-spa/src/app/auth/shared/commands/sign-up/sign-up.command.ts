import {UserModel} from '../../models/user.model';

export class SignUpCommand {

  public constructor(public user: UserModel) {
  }
}
