import { Inject, Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

import { JwtTokenModel } from '@wlodzimierz/domain/src/lib/models/jwt-token.model';
import { AbstractCookieService } from '@wlodzimierz/infrastructure/src/lib/common/services/abstract-cookie.service';

@Injectable()
export class JwtTokenServiceImpl extends AbstractCookieService<JwtTokenModel> {
  public constructor(@Inject(CookieService) cookieService) {
    super('WlodzimierzJwtToken', cookieService);
  }

  public read(): JwtTokenModel {
    return { value: this.cookieService.get(this.cookieName) };
  }
}
