import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AbstractApiService } from '../../../../../../storage/src/lib/remote/services/abstract-api.service';
import { EndpointBuilder } from '../../../../../../storage/src/lib/remote/builders/endpoint.builder';
import { UsersEndpointBuilder } from '../users-endpoint.builder';
import { ConversationsList } from '../../../../../../chat/src/lib/conversations/shared/models/conversations-list.models';
import { User } from '../../models/user.model';

@Injectable()
export class UsersService extends AbstractApiService {
  public constructor(http: HttpClient, @Inject(UsersEndpointBuilder) endpointBuilder: EndpointBuilder) {
    super(http, endpointBuilder);
  }

  public getConversations(user: User): Observable<ConversationsList> | undefined {
    const endpoint = this.endpointBuilder
      .withParameter(user.userId)
      .withAction('Conversations')
      .build();

    return this.http.get<ConversationsList>(endpoint.url);
  }
}
