import {UserModel} from '../../../../domain/models/user.model';

export class SignUpCommand {
  public constructor(public user: UserModel) {
  }
}
