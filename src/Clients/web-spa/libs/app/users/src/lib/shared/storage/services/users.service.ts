import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { AbstractApiService } from '../../../../../../../shared/storage/src/lib/remote/abstract-api.service';
import { EndpointBuilder } from '../../../../../../../shared/storage/src/lib/remote/endpoints/endpoint.builder';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserModel } from '../../models/user.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UsersEndpointBuilder } from '../users-endpoint.builder';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ConversationsList } from '../../../../../../conversations/src/lib/shared/models/conversations-list.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ContactsList } from '../../../../../../contacts/src/lib/shared/models/contacts-list.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UsersList } from '../../models/users-list.model';

@Injectable()
export class UsersService extends AbstractApiService {
  public constructor(
    http: HttpClient,
    @Inject(UsersEndpointBuilder) endpointBuilder: EndpointBuilder
  ) {
    super(http, endpointBuilder);
  }

  public getConversations(user: UserModel): Observable<ConversationsList> {
    const endpoint = this.endpointBuilder
      .reset()
      .withAction('Conversations')
      .build();

    return this.http.get<ConversationsList>(endpoint.url, {
      params: { OwnerUserId: user.userId }
    });
  }

  public getContacts(user: UserModel): Observable<ContactsList> {
    const endpoint = this.endpointBuilder
      .reset()
      .withAction('Contacts')
      .build();

    return this.http.get<ContactsList>(endpoint.url, {
      params: { OwnerUserId: user.userId }
    });
  }

  public filter(userName: string): Observable<UsersList> {
    const endpoint = this.endpointBuilder
      .reset()
      .withAction('filter')
      .build();

    return this.http.get<UsersList>(endpoint.url, {
      params: { UserName: userName }
    });
  }
}
