import {JwtTokenModel} from '../../../domain/models/jwt-token.model';

export interface JwtTokenService {

  // @ts-ignore
  write(token: JwtTokenModel, expires: Date | undefined = undefined): void;

  read(): JwtTokenModel;

  check(): boolean;

  clear(): void;
}
