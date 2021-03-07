import { Injectable } from '@angular/core';

import { AbstractEndpointBuilder } from '../../../../../../shared/storage/src/lib/core/remote/endpoints/abstract-endpoint.builder';

@Injectable()
export class ConversationsEndpointBuilder extends AbstractEndpointBuilder {
  public constructor() {
    super('Conversations');
  }
}
