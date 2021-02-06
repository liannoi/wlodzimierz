import { HttpClient, HttpHeaders } from '@angular/common/http';

import { JwtToken } from '../../../../auth/src/lib/shared/models/jwt-token.model';
import { EndpointBuilder } from '../endpoints/endpoint.builder';

export abstract class AbstractApiService {
  protected constructor(protected http: HttpClient, protected endpointBuilder?: EndpointBuilder) {
  }

  protected withAuthorization(token: JwtToken): { headers: HttpHeaders } {
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token.value}` }) };
  }
}
