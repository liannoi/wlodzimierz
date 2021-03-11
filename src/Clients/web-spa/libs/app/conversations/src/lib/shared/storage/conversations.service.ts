import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Conversation } from '../models/conversation.model';
import { ConversationsEndpointBuilder } from './conversations-endpoint.builder';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ConversationMessagesList } from '../../../../../conversation-messages/src/lib/shared/models/conversation-messages-list.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AbstractApiService } from '../../../../../../shared/storage/src/lib/remote/abstract-api.service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { EndpointBuilder } from '../../../../../../shared/storage/src/lib/remote/endpoints/endpoint.builder';

@Injectable()
export class ConversationsService extends AbstractApiService {
  public constructor(
    http: HttpClient,
    @Inject(ConversationsEndpointBuilder) endpointBuilder: EndpointBuilder
  ) {
    super(http, endpointBuilder);
  }

  public getMessages(
    conversation: Conversation
  ): Observable<ConversationMessagesList> {
    const endpoint = this.endpointBuilder
      .reset()
      .withAction('Messages')
      .withPageSize(99)
      .build();

    return this.http.get<ConversationMessagesList>(endpoint.url, {
      params: { conversationId: conversation.conversationId.toString() }
    });
  }

  public create(conversation: Conversation): Observable<number> {
    const endpoint = this.endpointBuilder.reset().build();

    return this.http.post<number>(endpoint.url, conversation);
  }
}
