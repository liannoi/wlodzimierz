import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

import { JwtToken } from '../models/jwt-token.model';
import { AbstractCookieService } from '../../../../../api/src/lib/cookies/abstract-cookie.service';

@Injectable()
export class JwtTokenService extends AbstractCookieService<JwtToken> {
  public constructor(cookieService: CookieService) {
    super('WlodzimierzJwtToken', cookieService);
  }

  read(): JwtToken {
    return { value: this.cookieService.get(this.cookieName) };
  }
}
