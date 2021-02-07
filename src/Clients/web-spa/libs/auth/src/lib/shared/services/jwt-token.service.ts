import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

import { JwtToken } from '../models/jwt-token.model';
import { AbstractCookieService } from '../../../../../api/src/lib/cookies/abstract-cookie.service';
import { User } from '../models/user.model';

@Injectable()
export class JwtTokenService extends AbstractCookieService<JwtToken> {
  public constructor(cookieService: CookieService) {
    super('WlodzimierzJwtToken', cookieService);
  }

  public read(): JwtToken {
    return { value: this.cookieService.get(this.cookieName) };
  }

  public writeExpires(user: User, token: JwtToken): void {
    const date = new Date();
    const minutes = user.shouldRemember ? 15 : 5;
    date.setMinutes(date.getMinutes() + minutes);
    this.write(token.value, date);
  }
}
