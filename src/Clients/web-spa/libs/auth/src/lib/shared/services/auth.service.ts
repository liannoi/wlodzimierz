import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { User } from '../models/user.model';
import { JwtToken } from '../models/jwt-token.model';
import { UsersEndpointBuilder } from '../builders/users-endpoint.builder';
import { AbstractApiService } from '../../../../../api/src/lib/services/abstract-api.service';
import { EndpointBuilder } from '../../../../../api/src/lib/endpoints/endpoint.builder';

@Injectable()
export class AuthService extends AbstractApiService {
  public constructor(http: HttpClient, @Inject(UsersEndpointBuilder) endpointBuilder: EndpointBuilder) {
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

  public verify(token: JwtToken): Observable<User> {
    const endpoint = this.endpointBuilder.withAction('Verify').build();

    return this.http.post<User>(endpoint.url, token, this.withAuthorization(token));
  }
}
