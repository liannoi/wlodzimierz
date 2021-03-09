import { Inject, Injectable } from '@angular/core';

import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

import { Notifiable } from '../common/interfaces/notifiable.interface';
import { BaseNotification } from '../common/abstractions/base.notification';
import { NotificationsEndpointBuilder } from '../common/builders/notifications-endpoint.builder';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { EndpointBuilder } from '../../../../storage/src/lib/remote/endpoints/endpoint.builder';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Disposable } from '../../../../storage/src/lib/common/interfaces/disposable.interface';

@Injectable()
export class NotificationsService implements Notifiable, Disposable {
  private _connection: HubConnection;

  public constructor(
    @Inject(NotificationsEndpointBuilder)
    private endpointBuilder: EndpointBuilder
  ) {
    this._connection = new HubConnectionBuilder()
      .withUrl(endpointBuilder.build().url)
      .build();
  }

  public onDispose(): void {
    this._connection.stop();
  }

  public async start() {
    return await this._connection
      .start()
      .then(() => console.log('Server connection successfully established.'))
      .catch((error) => {
        console.log('Server connection failed.');
        console.error(error);
      });
  }

  public subscribe<TNotification extends BaseNotification>(
    action: (notification: TNotification) => void
  ): void {
    if (!this._connection) {
      this.start().then(() => this._connection.on('SubscribeAsync', action));
      return;
    }

    this._connection.on('SubscribeAsync', action);
  }

  /**
   * @deprecated The method shouldn't be used.
   */
  public publish(notification: string): void {
    this._connection.invoke('PublishAsync', notification);
  }
}
