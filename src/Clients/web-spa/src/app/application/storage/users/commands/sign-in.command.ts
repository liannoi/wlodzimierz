import {UserModel} from '../../../../domain/models/user.model';

export class SignInCommand {
  public constructor(public user: UserModel) {
  }
}
