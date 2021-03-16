import { HttpClient, HttpHeaders } from '@angular/common/http';

import { EndpointBuilder } from './endpoints/endpoint.builder';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { JwtToken } from '../../../../../app/users/src/lib/shared/models/jwt-token.model';

export abstract class AbstractApiService {
  protected constructor(
    protected http: HttpClient,
    protected endpointBuilder?: EndpointBuilder
  ) {}

  protected withAuthorization(token: JwtToken): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({ Authorization: `Bearer ${token.value}` }),
    };
  }
}
