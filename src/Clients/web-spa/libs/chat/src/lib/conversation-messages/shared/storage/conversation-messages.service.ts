import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AbstractApiService } from '../../../../../../storage/src/lib/remote/services/abstract-api.service';
import { ConversationMessagesEndpointBuilder } from './conversation-messages-endpoint.builder';
import { EndpointBuilder } from '../../../../../../storage/src/lib/remote/builders/endpoint.builder';
import { ConversationMessage } from '../models/conversation-message.model';

@Injectable()
export class ConversationMessagesService extends AbstractApiService {
  public constructor(http: HttpClient, @Inject(ConversationMessagesEndpointBuilder) endpointBuilder: EndpointBuilder) {
    super(http, endpointBuilder);
  }

  public create(message: ConversationMessage): Observable<number> {
    const endpoint = this.endpointBuilder.build();

    return this.http.post<number>(endpoint.url, message);
  }
}
