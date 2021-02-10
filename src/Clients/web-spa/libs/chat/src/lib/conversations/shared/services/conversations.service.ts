import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Conversation } from '../models/conversation.model';
import { AbstractApiService } from '../../../../../../storage/src/lib/remote/services/abstract-api.service';
import { EndpointBuilder } from '../../../../../../storage/src/lib/remote/endpoints/endpoint.builder';
import { ConversationsEndpointBuilder } from '../builders/conversations-endpoint.builder';
import { JwtToken } from '../../../../../../auth/src/lib/shared/models/jwt-token.model';
import { ConversationMessagesList } from '../../../conversation-messages/shared/conversation-messages-list.model';

@Injectable()
export class ConversationsService extends AbstractApiService<JwtToken> {
  public constructor(http: HttpClient, @Inject(ConversationsEndpointBuilder) endpointBuilder: EndpointBuilder) {
    super(http, endpointBuilder);
  }

  public getMessages(conversation: Conversation, pageSize: number = 1): Observable<ConversationMessagesList> {
    const endpoint = this.endpointBuilder
      .withParameter(conversation.conversationId.toString())
      .withAction('Messages')
      .withPageSize(pageSize)
      .build();

    return this.http.get<ConversationMessagesList>(endpoint.url);
  }
}
