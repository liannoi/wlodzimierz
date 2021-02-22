import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { User } from '../../models/user.model';
import { UsersEndpointBuilder } from '../users-endpoint.builder';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AbstractApiService } from '../../../../../../../shared/storage/src/lib/remote/abstract-api.service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { EndpointBuilder } from '../../../../../../../shared/storage/src/lib/remote/endpoints/endpoint.builder';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ConversationsList } from '../../../../../../chat/src/lib/conversations/shared/models/conversations-list.model';

@Injectable()
export class UsersService extends AbstractApiService {
  public constructor(
    http: HttpClient,
    @Inject(UsersEndpointBuilder) endpointBuilder: EndpointBuilder
  ) {
    super(http, endpointBuilder);
  }

  public getConversations(
    user: User
  ): Observable<ConversationsList> | undefined {
    const endpoint = this.endpointBuilder
      .withParameter(user.userId)
      .withAction('Conversations')
      .build();

    return this.http.get<ConversationsList>(endpoint.url);
  }
}
