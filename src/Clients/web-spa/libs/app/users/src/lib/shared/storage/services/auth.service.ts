import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { UserModel } from '../../../../../../../shared/storage/src/lib/users/models/user.model';
import { JwtTokenService } from './jwt-token.service';
import { JwtToken } from '../../../../../../../shared/storage/src/lib/users/models/jwt-token.model';
import { UsersEndpointBuilder } from '../users-endpoint.builder';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CookiesService } from '../../../../../../../shared/storage/src/lib/common/interfaces/cookies.service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AbstractApiService } from '../../../../../../../shared/storage/src/lib/core/remote/abstract-api.service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { EndpointBuilder } from '../../../../../../../shared/storage/src/lib/core/remote/endpoints/endpoint.builder';

@Injectable()
export class AuthService extends AbstractApiService {
  public constructor(
    http: HttpClient,
    @Inject(UsersEndpointBuilder) endpointBuilder: EndpointBuilder,
    @Inject(JwtTokenService) private tokenService: CookiesService<JwtToken>
  ) {
    super(http, endpointBuilder);
  }

  public verify(): Observable<UserModel> {
    const tokenInCookies = this.tokenService.read();

    return tokenInCookies.value != ''
      ? this.requestVerify(tokenInCookies)
      : throwError('Token is empty.');
  }

  public signIn(user: UserModel): Observable<JwtToken> {
    const endpoint = this.endpointBuilder.withAction('SignIn').build();

    return this.http.post<JwtToken>(endpoint.url, user);
  }

  public signUp(user: UserModel): Observable<JwtToken> {
    const endpoint = this.endpointBuilder.withAction('SignUp').build();

    return this.http.post<JwtToken>(endpoint.url, user);
  }

  ///////////////////////////////////////////////////////////////////////////
  // Helpers
  ///////////////////////////////////////////////////////////////////////////

  private requestVerify(token: JwtToken): Observable<UserModel> {
    const endpoint = this.endpointBuilder.withAction('Verify').build();

    return this.http.post<UserModel>(
      endpoint.url,
      token,
      this.withAuthorization(token)
    );
  }
}
