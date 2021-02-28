import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { AbstractApiService } from './abstract-api.service';
import { EndpointBuilder } from './endpoints/endpoint.builder';
import { User } from '../../../../../app/users/src/lib/shared/models/user.model';
import { UsersEndpointBuilder } from '../../../../../app/users/src/lib/shared/storage/users-endpoint.builder';
import { ConversationsList } from '../../../../../app/conversations/src/lib/shared/models/conversations-list.model';
import { ContactsList } from '../../../../../app/contacts/src/lib/shared/models/contacts-list.model';

@Injectable()
export class UsersService extends AbstractApiService {
  public constructor(http: HttpClient, @Inject(UsersEndpointBuilder) endpointBuilder: EndpointBuilder) {
    super(http, endpointBuilder);
  }

  public getConversations(user: User): Observable<ConversationsList> {
    const endpoint = this.endpointBuilder
      .withParameter(user.userId)
      .withAction('Conversations')
      .build();

    return this.http.get<ConversationsList>(endpoint.url);
  }

  public getContacts(user: User): Observable<ContactsList> {
    const endpoint = this.endpointBuilder
      .withParameter(user.userId)
      .withAction('Contacts')
      .build();

    return this.http.get<ContactsList>(endpoint.url);
  }
}
