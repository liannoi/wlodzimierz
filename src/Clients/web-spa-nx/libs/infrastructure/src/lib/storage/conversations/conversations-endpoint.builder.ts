import { ApiBaseAddress } from '@wlodzimierz/infrastructure/src/lib/common/endpoints/api.endpoint';
// eslint-disable-next-line max-len
import { AbstractPagingEndpointBuilder } from '@wlodzimierz/infrastructure/src/lib/common/endpoints/builders/abstract-paging-endpoint.builder';

export class ConversationsEndpointBuilder extends AbstractPagingEndpointBuilder {

  public constructor() {
    super(ApiBaseAddress, 'Conversations');
  }
}
