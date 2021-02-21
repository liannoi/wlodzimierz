import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AbstractApiService } from '../../../../../../storage/src/lib/remote/abstract-api.service';
import { ConversationsEndpointBuilder } from './conversations-endpoint.builder';
import { EndpointBuilder } from '../../../../../../storage/src/lib/remote/endpoints/endpoint.builder';
import { Conversation } from '../models/conversation.model';
import { ConversationMessagesList } from '../../../conversation-messages/shared/models/conversation-messages-list.model';

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
      .withParameter(conversation.conversationId.toString())
      .withAction('Messages')
      .withPageSize(99)
      .build();

    return this.http.get<ConversationMessagesList>(endpoint.url);
  }
}
