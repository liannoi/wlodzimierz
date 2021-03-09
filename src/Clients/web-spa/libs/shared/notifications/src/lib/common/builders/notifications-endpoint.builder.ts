import { Injectable } from '@angular/core';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AbstractEndpointBuilder } from '../../../../../storage/src/lib/core/remote/endpoints/abstract-endpoint.builder';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { environment } from 'apps/wlodzimierz/src/environments/environment';

@Injectable()
export class NotificationsEndpointBuilder extends AbstractEndpointBuilder {
  public constructor() {
    super('Notifications', environment.endpoint);
  }
}
