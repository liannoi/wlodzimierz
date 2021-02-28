import { Injectable } from '@angular/core';

import { AbstractEndpointBuilder } from '../../../../../storage/src/lib/remote/endpoints/abstract-endpoint.builder';

@Injectable()
export class NotificationsEndpointBuilder extends AbstractEndpointBuilder {
  public constructor() {
    super('Notifications', 'http://20.75.224.52:5000');
  }
}
