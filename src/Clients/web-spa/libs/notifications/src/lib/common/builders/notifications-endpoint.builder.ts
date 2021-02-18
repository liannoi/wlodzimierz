import { Injectable } from '@angular/core';

import { AbstractEndpointBuilder } from '../../../../../storage/src/lib/remote/builders/abstract-endpoint.builder';

@Injectable()
export class NotificationsEndpointBuilder extends AbstractEndpointBuilder {
  public constructor() {
    super('Notifications', 'https://localhost:5001');
  }
}
