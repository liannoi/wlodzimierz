import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AbstractApiService } from '../../../../../../storage/src/lib/remote/services/abstract-api.service';
import { ConversationsEndpointBuilder } from '../builders/conversations-endpoint.builder';
import { EndpointBuilder } from '../../../../../../storage/src/lib/remote/builders/endpoint.builder';

@Injectable()
export class ConversationsService extends AbstractApiService {
  public constructor(http: HttpClient, @Inject(ConversationsEndpointBuilder) endpointBuilder: EndpointBuilder) {
    super(http, endpointBuilder);
  }
}
