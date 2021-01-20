import {Injectable} from '@angular/core';

import {CookieService} from 'ngx-cookie-service';

import {JwtTokenService} from '../../../../application/storage/users/jwt-token.service';
import {JwtTokenModel} from '../../../../domain/models/jwt-token.model';

@Injectable()
export class JwtTokenServiceImpl implements JwtTokenService {

  private JwtTokenName = 'WlodzimierzJwtToken';

  public constructor(private cookieService: CookieService) {
  }

  public check(): boolean {
    return this.cookieService.check(this.JwtTokenName);
  }

  public clear(): void {
    this.cookieService.delete(this.JwtTokenName);
  }

  public read(): JwtTokenModel {
    return {value: this.cookieService.get(this.JwtTokenName)};
  }

  public write(token: JwtTokenModel, expires?: Date | undefined): void {
    this.cookieService.set(this.JwtTokenName, token.value, {path: '/', expires});
  }
}
