import { Injectable } from '@angular/core';

import { AbstractEndpointBuilder } from '../../../../../../shared/storage/src/lib/remote/endpoints/abstract-endpoint.builder';

@Injectable()
export class UsersSecurityEndpointBuilder extends AbstractEndpointBuilder {
  public constructor() {
    super('UsersSecurity');
  }
}
