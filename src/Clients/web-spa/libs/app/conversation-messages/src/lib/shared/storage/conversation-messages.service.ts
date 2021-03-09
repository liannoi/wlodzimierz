import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ConversationMessage } from '../models/conversation-message.model';
import { CreatedNotificationHandler } from '../notifications/create/created-notification.handler';
import { ConversationMessagesEndpointBuilder } from './conversation-messages-endpoint.builder';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AbstractApiService } from '../../../../../../shared/storage/src/lib/core/remote/abstract-api.service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { EndpointBuilder } from '../../../../../../shared/storage/src/lib/core/remote/endpoints/endpoint.builder';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { NotificationsService } from '../../../../../../shared/notifications/src/lib/services/notifications.service';

@Injectable()
export class ConversationMessagesService extends AbstractApiService {
  public constructor(
    http: HttpClient,
    @Inject(ConversationMessagesEndpointBuilder)
      endpointBuilder: EndpointBuilder,
    private notificationsService: NotificationsService
  ) {
    super(http, endpointBuilder);
  }

  public create(message: ConversationMessage): Observable<number> {
    const endpoint = this.endpointBuilder.build();

    return this.http.post<number>(endpoint.url, message);
  }

  public onCreated(
    action: (notification: CreatedNotificationHandler) => void
  ): void {
    this.notificationsService.subscribe<CreatedNotificationHandler>(action);
  }
}
