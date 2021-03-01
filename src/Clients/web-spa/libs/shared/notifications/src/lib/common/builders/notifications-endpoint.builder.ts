import { Injectable } from '@angular/core';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AbstractEndpointBuilder } from '../../../../../storage/src/lib/remote/endpoints/abstract-endpoint.builder';

@Injectable()
export class NotificationsEndpointBuilder extends AbstractEndpointBuilder {
  /*
   * Remote - http://20.75.224.52:5000
   * Local - https://localhost:5001
   *
   */
  public constructor() {
    super('Notifications', 'https://localhost:5001');
  }
}
