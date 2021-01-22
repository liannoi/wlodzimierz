import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

import { JwtTokenService } from '@wlodzimierz/data/src/lib/storage/users/services/jwt-token.service';
import { JwtTokenModel } from '@wlodzimierz/domain/src/lib/models/jwt-token.model';

@Injectable()
export class JwtTokenServiceImpl implements JwtTokenService {

  private jwtToken = 'WlodzimierzJwtToken';

  public constructor(private cookieService: CookieService) {
  }

  public check(): boolean {
    return this.cookieService.check(this.jwtToken);
  }

  public clear(): void {
    this.cookieService.delete(this.jwtToken);
  }

  public read(): JwtTokenModel {
    return { value: this.cookieService.get(this.jwtToken) };
  }

  public write(token: JwtTokenModel, expires?: Date): void {
    this.cookieService.set(this.jwtToken, token.value, { path: '/', expires });
  }
}
