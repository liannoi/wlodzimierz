import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ConversationMessagesEndpointBuilder } from './conversation-messages-endpoint.builder';
import { ConversationMessage } from '../models/conversation-message.model';
import { CreatedNotification } from '../notifications/created.notification';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { SharedNotificationsService } from '../../../../../../notifications/src/lib/services/notifications.service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AbstractApiService } from '../../../../../../storage/src/lib/remote/abstract-api.service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { EndpointBuilder } from '../../../../../../storage/src/lib/remote/endpoints/endpoint.builder';

@Injectable()
export class ConversationMessagesService extends AbstractApiService {
  public constructor(
    http: HttpClient,
    @Inject(ConversationMessagesEndpointBuilder)
      endpointBuilder: EndpointBuilder,
    private notificationsService: SharedNotificationsService
  ) {
    super(http, endpointBuilder);
  }

  public create(message: ConversationMessage): Observable<number> {
    const endpoint = this.endpointBuilder.build();

    return this.http.post<number>(endpoint.url, message);
  }

  public onCreated(action: (notification: CreatedNotification) => void): void {
    this.notificationsService.subscribe<CreatedNotification>(action);
  }
}
