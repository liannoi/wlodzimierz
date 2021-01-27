import { Injectable } from '@angular/core';

import { ApiBaseAddress } from '@wlodzimierz/infrastructure/src/lib/common/endpoints/api.endpoint';
import { AbstractEndpointBuilder } from '@wlodzimierz/infrastructure/src/lib/common/endpoints/abstract-endpoint.builder';

@Injectable()
export class ConversationsEndpointBuilder extends AbstractEndpointBuilder {
  public constructor() {
    super(ApiBaseAddress, 'Conversations');
  }
}
