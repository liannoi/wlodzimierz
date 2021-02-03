import { Inject, Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

import { AbstractCookieService } from '@wlodzimierz/infrastructure/src/lib/common/services/abstract-cookie.service';
import { UserModel } from '@wlodzimierz/domain/src/lib/models/user.model';

@Injectable()
export class UserNameServiceImpl extends AbstractCookieService<UserModel> {
  public constructor(@Inject(CookieService) cookieService) {
    super('WlodzimierzUser', cookieService);
  }

  public read(): UserModel {
    return new UserModel('', this.cookieService.get(this.cookieName));
  }
}
