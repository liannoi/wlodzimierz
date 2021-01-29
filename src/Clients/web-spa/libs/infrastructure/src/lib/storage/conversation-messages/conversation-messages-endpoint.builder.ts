import { Injectable } from '@angular/core';

import { AbstractEndpointBuilder } from '@wlodzimierz/application/src/lib/core/endpoints/abstract-endpoint.builder';

@Injectable()
export class ConversationMessagesEndpointBuilder extends AbstractEndpointBuilder {
  public constructor() {
    super('ConversationMessages');
  }
}
