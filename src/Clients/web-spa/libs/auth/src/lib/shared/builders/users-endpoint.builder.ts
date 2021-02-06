import { Injectable } from '@angular/core';

import { AbstractEndpointBuilder } from '../../../../../api/src/lib/endpoints/abstract-endpoint.builder';

@Injectable()
export class UsersEndpointBuilder extends AbstractEndpointBuilder {
  public constructor() {
    super('Users');
  }
}
