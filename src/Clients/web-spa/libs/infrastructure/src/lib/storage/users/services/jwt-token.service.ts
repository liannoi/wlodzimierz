import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

import { JwtTokenService } from '@wlodzimierz/application/src/lib/storage/users/services/jwt-token.service';
import { JwtTokenModel } from '@wlodzimierz/domain/src/lib/models/jwt-token.model';

@Injectable()
export class JwtTokenServiceImpl implements JwtTokenService {
  private cookieName = 'WlodzimierzJwtToken';

  public constructor(private cookieService: CookieService) {
  }

  public check(): boolean {
    return this.cookieService.check(this.cookieName);
  }

  public clear(): void {
    this.cookieService.delete(this.cookieName);
  }

  public read(): JwtTokenModel {
    return { value: this.cookieService.get(this.cookieName) };
  }

  public write(token: JwtTokenModel, expires?: Date): void {
    this.cookieService.set(this.cookieName, token.value, { path: '/', expires });
  }
}
