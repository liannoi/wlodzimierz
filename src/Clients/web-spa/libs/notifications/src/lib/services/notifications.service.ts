import { Inject, Injectable } from '@angular/core';

import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

import { Notifiable } from '../common/interfaces/notifiable.interface';
import { NotificationsEndpointBuilder } from '../common/builders/notifications-endpoint.builder';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { EndpointBuilder } from '../../../../storage/src/lib/remote/builders/endpoint.builder';

@Injectable()
export class NotificationsService implements Notifiable {
  private readonly _connection: HubConnection;

  public constructor(@Inject(NotificationsEndpointBuilder) private endpointBuilder: EndpointBuilder) {
    this._connection = new HubConnectionBuilder().withUrl(endpointBuilder.build().url).build();
  }

  public async start(): Promise<void> {
    return await this._connection
      .start()
      .then(() => console.log('OK'))
      .catch((error) => console.error(error));
  }

  public subscribe<TNotification>(action: (notification: TNotification) => void) {
    this._connection.on('SubscribeAsync', action);
  }

  /**
   * @deprecated The method shouldn't be used.
   */
  public publish(notification: string): void {
    this._connection.invoke('PublishAsync', notification);
  }
}
