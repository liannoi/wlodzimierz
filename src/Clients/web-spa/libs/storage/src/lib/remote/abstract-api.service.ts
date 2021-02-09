import { HttpClient, HttpHeaders } from '@angular/common/http';

import { EndpointBuilder } from './endpoints/endpoint.builder';

export abstract class AbstractApiService<TToken extends { value: string }> {
  protected constructor(protected http: HttpClient, protected endpointBuilder?: EndpointBuilder) {
  }

  protected withAuthorization(token: TToken): { headers: HttpHeaders } {
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token.value}` }) };
  }
}
