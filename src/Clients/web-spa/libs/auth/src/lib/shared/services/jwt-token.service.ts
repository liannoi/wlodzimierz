import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

import { JwtToken } from '../models/jwt-token.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AbstractCookieService } from '../../../../../api/src/lib/cookies/abstract-cookie.service';

@Injectable()
export class JwtTokenService extends AbstractCookieService<JwtToken> {
  public constructor(cookieService: CookieService) {
    super('WlodzimierzJwtToken', cookieService);
  }

  public read(): JwtToken {
    return { value: this.cookieService.get(this.cookieName) };
  }

  public writeExpires( token: JwtToken,shouldRemember:boolean): void {
    const date = new Date();
    const minutes = shouldRemember ? 15 : 5;
    date.setMinutes(date.getMinutes() + minutes);
    this.write(token.value, date);
  }
}
