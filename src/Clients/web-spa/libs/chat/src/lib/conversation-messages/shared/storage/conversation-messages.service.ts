import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ConversationMessagesEndpointBuilder } from './conversation-messages-endpoint.builder';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { EndpointBuilder } from '../../../../../../storage/src/lib/remote/builders/endpoint.builder';
import { ConversationMessage } from '../models/conversation-message.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AbstractApiService } from '../../../../../../storage/src/lib/remote/services/abstract-api.service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { NotificationsService } from '../../../../../../notifications/src/lib/services/notifications.service';
import { CreatedNotification } from '../notifications/created.notification';

export abstract class AbstractSocketApiService extends AbstractApiService {
  protected isCalled = false;

  protected constructor(http: HttpClient, endpointBuilder: EndpointBuilder, protected notificationsService: NotificationsService) {
    super(http, endpointBuilder);
  }
}

@Injectable()
export class ConversationMessagesService extends AbstractSocketApiService {
  public constructor(http: HttpClient, @Inject(ConversationMessagesEndpointBuilder) endpointBuilder: EndpointBuilder, notificationsService: NotificationsService) {
    super(http, endpointBuilder, notificationsService);
  }

  public create(message: ConversationMessage): Observable<number> {
    const endpoint = this.endpointBuilder.build();

    return this.http.post<number>(endpoint.url, message);
  }

  public subscribeCreate(): void {
    this.notificationsService.subscribe<CreatedNotification>((notification => {
      console.log('Update conversation!');
      console.log(notification);
      this.isCalled = true;
    }));
  }
}
