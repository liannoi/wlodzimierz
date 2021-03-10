import { Injectable } from '@angular/core';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AbstractEndpointBuilder } from '../../../../../../shared/storage/src/lib/remote/endpoints/abstract-endpoint.builder';

@Injectable()
export class ConversationsEndpointBuilder extends AbstractEndpointBuilder {
  public constructor() {
    super('Conversations');
  }
}
