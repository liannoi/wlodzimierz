import { HttpClient, HttpHeaders } from '@angular/common/http';

import { EndpointBuilder } from '../builders/endpoint.builder';
import { JwtToken } from '../../../../../users/src/lib/shared/models/jwt-token.model';

export abstract class AbstractApiService {
  protected constructor(protected http: HttpClient, protected endpointBuilder?: EndpointBuilder) {
  }

  protected withAuthorization(token: JwtToken): { headers: HttpHeaders } {
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token.value}` }) };
  }
}