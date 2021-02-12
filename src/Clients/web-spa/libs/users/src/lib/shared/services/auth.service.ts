import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { AbstractApiService } from '../../../../../storage/src/lib/remote/services/abstract-api.service';
import { JwtToken } from '../models/jwt-token.model';
import { UsersEndpointBuilder } from '../builders/users-endpoint.builder';
import { EndpointBuilder } from '../../../../../storage/src/lib/remote/builders/endpoint.builder';
import { JwtTokenService } from './jwt-token.service';
import { Cookie } from '../../../../../storage/src/lib/local/models/cookie.model';
import { User } from '../models/user.model';

@Injectable()
export class AuthService extends AbstractApiService<JwtToken> {
  public constructor(
    http: HttpClient,
    @Inject(UsersEndpointBuilder) endpointBuilder: EndpointBuilder,
    @Inject(JwtTokenService) private tokenService: Cookie<JwtToken>
  ) {
    super(http, endpointBuilder);
  }

  public verify(): Observable<User> {
    const tokenInCookies = this.tokenService.read();

    return tokenInCookies ? this.requestVerify(tokenInCookies) : throwError('Token is empty.');
  }

  ///////////////////////////////////////////////////////////////////////////
  // Helpers
  ///////////////////////////////////////////////////////////////////////////

  private requestVerify(token: JwtToken): Observable<User> {
    const endpoint = this.endpointBuilder.withAction('Verify').build();

    return this.http.post<User>(endpoint.url, token, this.withAuthorization(token));
  }
}
