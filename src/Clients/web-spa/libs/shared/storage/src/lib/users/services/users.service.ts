import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { AbstractApiService } from '../../core/remote/abstract-api.service';
import { EndpointBuilder } from '../../core/remote/endpoints/endpoint.builder';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserModel } from '../models/user.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UsersEndpointBuilder } from '../../../../../../app/users/src/lib/shared/storage/users-endpoint.builder';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ConversationsList } from '../../../../../../app/conversations/src/lib/shared/models/conversations-list.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ContactsList } from '../../../../../../app/contacts/src/lib/shared/models/contacts-list.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UsersList } from '../models/users-list.model';

@Injectable()
export class UsersService extends AbstractApiService {
  public constructor(http: HttpClient, @Inject(UsersEndpointBuilder) endpointBuilder: EndpointBuilder) {
    super(http, endpointBuilder);
  }

  public getConversations(user: UserModel): Observable<ConversationsList> {
    const endpoint = this.endpointBuilder
      .withParameter(user.userId)
      .withAction('Conversations')
      .build();

    return this.http.get<ConversationsList>(endpoint.url);
  }

  public getContacts(user: UserModel): Observable<ContactsList> {
    const endpoint = this.endpointBuilder
      .withParameter(user.userId)
      .withAction('Contacts')
      .build();

    return this.http.get<ContactsList>(endpoint.url);
  }

  public filter(userName: string): Observable<UsersList> {
    const endpoint = this.endpointBuilder
      .withParameter('-')
      .withAction('filter')
      .build();

    return this.http.get<UsersList>(endpoint.url, { params: { UserName: userName } });
  }
}