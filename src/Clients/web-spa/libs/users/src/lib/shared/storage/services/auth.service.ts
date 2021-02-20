import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { AbstractApiService } from '../../../../../../storage/src/lib/remote/abstract-api.service';
import { JwtToken } from '../../models/jwt-token.model';
import { UsersEndpointBuilder } from '../users-endpoint.builder';
import { EndpointBuilder } from '../../../../../../storage/src/lib/remote/endpoints/endpoint.builder';
import { JwtTokenService } from './jwt-token.service';
import { CookiesService } from '../../../../../../storage/src/lib/local/cookies.service';
import { User } from '../../models/user.model';

@Injectable()
export class AuthService extends AbstractApiService {
  public constructor(
    http: HttpClient,
    @Inject(UsersEndpointBuilder) endpointBuilder: EndpointBuilder,
    @Inject(JwtTokenService) private tokenService: CookiesService<JwtToken>
  ) {
    super(http, endpointBuilder);
  }

  public verify(): Observable<User> {
    const tokenInCookies = this.tokenService.read();

    return tokenInCookies ? this.requestVerify(tokenInCookies) : throwError('Token is empty.');
  }

  public signIn(user: User): Observable<JwtToken> {
    const endpoint = this.endpointBuilder
      .withAction('SignIn')
      .build();

    return this.http.post<JwtToken>(endpoint.url, user);
  }

  public signUp(user: User): Observable<JwtToken> {
    const endpoint = this.endpointBuilder
      .withAction('SignUp')
      .build();

    return this.http.post<JwtToken>(endpoint.url, user);
  }

  ///////////////////////////////////////////////////////////////////////////
  // Helpers
  ///////////////////////////////////////////////////////////////////////////

  private requestVerify(token: JwtToken): Observable<User> {
    const endpoint = this.endpointBuilder
      .withAction('Verify')
      .build();

    return this.http.post<User>(endpoint.url, token, this.withAuthorization(token));
  }
}
