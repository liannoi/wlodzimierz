import { JwtTokenModel } from '@wlodzimierz/domain/src/lib/models/jwt-token.model';

export class VerifyCommand {

  public constructor(public token: JwtTokenModel) {
  }
}
