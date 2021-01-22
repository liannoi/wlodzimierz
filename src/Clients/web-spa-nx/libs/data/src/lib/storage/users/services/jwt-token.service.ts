import { JwtTokenModel } from '@wlodzimierz/domain/src/lib/models/jwt-token.model';

export interface JwtTokenService {

  write(token: JwtTokenModel, expires?: Date | undefined): void;

  read(): JwtTokenModel;

  check(): boolean;

  clear(): void;
}
