import {JwtTokenModel} from '../../models/jwt-token.model';

export class VerifyCommand {

  public constructor(public token: JwtTokenModel) {
  }
}
