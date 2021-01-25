import { ApiBaseAddress } from '@wlodzimierz/infrastructure/src/lib/common/endpoints/api.endpoint';
import { AbstractEndpointBuilder } from '@wlodzimierz/infrastructure/src/lib/common/endpoints/builders/abstract-endpoint.builder';

export class UsersEndpointBuilder extends AbstractEndpointBuilder {

  public constructor() {
    super(ApiBaseAddress, 'Users');
  }
}
