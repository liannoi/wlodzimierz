import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AbstractApiService } from '../../../../../../shared/storage/src/lib/remote/abstract-api.service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { EndpointBuilder } from '../../../../../../shared/storage/src/lib/remote/endpoints/endpoint.builder';
import { ContactsEndpointBuilder } from './contacts-endpoint.builder';
import { Contact } from '../models/contact.model';

@Injectable()
export class ContactsService extends AbstractApiService {
  public constructor(
    http: HttpClient,
    @Inject(ContactsEndpointBuilder) endpointBuilder: EndpointBuilder
  ) {
    super(http, endpointBuilder);
  }

  public create(contact: Contact): Observable<number> {
    const endpoint = this.endpointBuilder.reset().build();

    return this.http.post<number>(endpoint.url, contact);
  }

  public delete(contact: Contact) {
    const endpoint = this.endpointBuilder
      .withParameter(contact.contactId.toString())
      .build();

    return this.http.delete(endpoint.url);
  }
}
