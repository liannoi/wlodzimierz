import {JwtTokenModel} from '../../../../domain/models/jwt-token.model';

export class VerifyCommand {
  public constructor(public token: JwtTokenModel) {
  }
}
