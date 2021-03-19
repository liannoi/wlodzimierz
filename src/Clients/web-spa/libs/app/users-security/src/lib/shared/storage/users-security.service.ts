import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AbstractApiService } from '../../../../../../shared/storage/src/lib/remote/abstract-api.service';
import { UsersSecurityEndpointBuilder } from './users-security-endpoint.builder';
import { EndpointBuilder } from '../../../../../../shared/storage/src/lib/remote/endpoints/endpoint.builder';
import { UserModel } from '../../../../../users/src/lib/shared/models/user.model';
import { Authenticator } from '../models/authenticator.model';

@Injectable()
export class UsersSecurityService extends AbstractApiService {
  public constructor(
    http: HttpClient,
    @Inject(UsersSecurityEndpointBuilder) endpointBuilder: EndpointBuilder
  ) {
    super(http, endpointBuilder);
  }

  public setup(user: UserModel): Observable<Authenticator> {
    const endpoint = this.endpointBuilder.reset().withAction('Setup').build();

    return this.http.get<Authenticator>(endpoint.url, {
      params: { UserId: user.userId }
    });
  }
}
