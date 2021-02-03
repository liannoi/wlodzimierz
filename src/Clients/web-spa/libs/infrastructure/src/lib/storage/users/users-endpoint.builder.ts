import { Injectable } from '@angular/core';

import { AbstractEndpointBuilder } from '@wlodzimierz/application/src/lib/common/endpoints/abstract-endpoint.builder';

@Injectable()
export class UsersEndpointBuilder extends AbstractEndpointBuilder {
  public constructor() {
    super('Users');
  }
}
