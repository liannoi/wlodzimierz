import { Injectable } from '@angular/core';

import { AbstractEndpointBuilder } from '@wlodzimierz/infrastructure/src/lib/common/endpoints/abstract-endpoint.builder';
import { ApiBaseAddress } from '@wlodzimierz/infrastructure/src/lib/common/endpoints/api.endpoint';

@Injectable()
export class ConversationMessagesEndpointBuilder extends AbstractEndpointBuilder {

  public constructor() {
    super(ApiBaseAddress, 'ConversationMessages');
  }
}
