import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';

import { User } from '../models/user.model';
import { JwtToken } from '../models/jwt-token.model';
import { UsersEndpointBuilder } from '../builders/users-endpoint.builder';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AbstractApiService } from '../../../../../storage/src/lib/remote/abstract-api.service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { EndpointBuilder } from '../../../../../storage/src/lib/remote/endpoints/endpoint.builder';
import { JwtTokenService } from './jwt-token.service';

@Injectable()
export class AuthService extends AbstractApiService<JwtToken> {
  public constructor(
    http: HttpClient,
    @Inject(UsersEndpointBuilder) endpointBuilder: EndpointBuilder,
    private tokenService: JwtTokenService
  ) {
    super(http, endpointBuilder);
  }

  public signIn(user: User): Observable<JwtToken> {
    const endpoint = this.endpointBuilder.withAction('SignIn').build();

    return this.http.post<JwtToken>(endpoint.url, user);
  }

  public signUp(user: User): Observable<JwtToken> {
    const endpoint = this.endpointBuilder.withAction('SignUp').build();

    return this.http.post<JwtToken>(endpoint.url, user);
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
