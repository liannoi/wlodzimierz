import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

import { JwtToken } from '../../models/jwt-token.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AbstractCookieService } from '../../../../../../../shared/storage/src/lib/local/abstract-cookie.service';

@Injectable()
export class JwtTokenService extends AbstractCookieService<JwtToken> {
  public constructor(service: CookieService) {
    super('WlodzimierzJwtToken', service);
  }

  public read(): JwtToken {
    return { value: this.service.get(this.name) };
  }
}
