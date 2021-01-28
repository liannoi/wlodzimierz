import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, takeUntil } from 'rxjs/operators';

import { AbstractService } from '@wlodzimierz/infrastructure/src/lib/common/services/abstract.service';
// eslint-disable-next-line max-len
import { ConversationMessagesEndpointBuilder } from '@wlodzimierz/infrastructure/src/lib/storage/conversation-messages/conversation-messages-endpoint.builder';
import { ConversationMessagesService } from '@wlodzimierz/application/src/lib/storage/conversation-messages/conversation-messages.service';
import { CreateCommand } from '@wlodzimierz/application/src/lib/storage/conversation-messages/commands/create.command';
// eslint-disable-next-line max-len
import { ConversationMessageCreatedNotification } from '@wlodzimierz/domain/src/lib/notifications/conversation-messages/conversation-message-created.notification';

@Injectable()
export class ConversationMessagesServiceImpl extends AbstractService implements ConversationMessagesService {
  public constructor(http: HttpClient, private endpointBuilder: ConversationMessagesEndpointBuilder) {
    super(http);
  }

  public create(request: CreateCommand, notification: ConversationMessageCreatedNotification): void {
    const endpoint = this.endpointBuilder.build();

    this.http
      .post(endpoint.url, request.model)
      .pipe(catchError(this.handleError), takeUntil(this.subject))
      .subscribe(
        (result: number) => notification.onCreatedSuccess(result),
        (error) => notification.onCreatedFailed(error)
      );
  }
}
