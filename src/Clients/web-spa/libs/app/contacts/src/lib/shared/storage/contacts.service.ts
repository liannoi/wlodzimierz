import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AbstractApiService } from '../../../../../../shared/storage/src/lib/core/remote/abstract-api.service';
import { EndpointBuilder } from '../../../../../../shared/storage/src/lib/core/remote/endpoints/endpoint.builder';
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
    const endpoint = this.endpointBuilder.build();

    return this.http.post<number>(endpoint.url, contact);
  }
}
