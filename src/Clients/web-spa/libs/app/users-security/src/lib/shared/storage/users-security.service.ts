import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AbstractApiService } from '../../../../../../shared/storage/src/lib/remote/abstract-api.service';
import { UsersSecurityEndpointBuilder } from './users-security-endpoint.builder';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { EndpointBuilder } from '../../../../../../shared/storage/src/lib/remote/endpoints/endpoint.builder';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserModel } from '../../../../../users/src/lib/shared/models/user.model';
import { Authenticator } from '../models/authenticator.model';
import { RecoveryCodesList } from '../models/recovery-codes-list.model';

@Injectable()
export class UsersSecurityService extends AbstractApiService {
  public constructor(
    http: HttpClient,
    @Inject(UsersSecurityEndpointBuilder) endpointBuilder: EndpointBuilder
  ) {
    super(http, endpointBuilder);
  }

  public generate(user: UserModel): Observable<RecoveryCodesList> {
    const endpoint = this.endpointBuilder
      .reset()
      .withAction('Generate')
      .build();

    return this.http.post<RecoveryCodesList>(endpoint.url, {
      userId: user.userId
    });
  }

  public setup(user: UserModel): Observable<Authenticator> {
    const endpoint = this.endpointBuilder.reset().withAction('Setup').build();

    return this.http.post<Authenticator>(endpoint.url, { userId: user.userId });
  }

  public verify(user: UserModel, verificationCode: string) {
    const endpoint = this.endpointBuilder.reset().withAction('Verify').build();

    return this.http.post(endpoint.url, {
      userId: user.userId,
      verificationCode
    });
  }

  public disable(user: UserModel) {
    const endpoint = this.endpointBuilder.reset().withAction('Disable').build();

    return this.http.post(endpoint.url, { userId: user.userId });
  }
}
