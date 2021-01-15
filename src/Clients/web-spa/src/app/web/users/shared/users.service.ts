import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {catchError, takeUntil} from 'rxjs/operators';

import {AbstractService} from '../../../shared/abstract.service';
import {ConversationsQuery} from './queries/conversations/conversations.query';
import {OnConversationsHandler} from './queries/conversations/on-conversations.hander';
import {ConversationsListModel} from '../../conversations/shared/models/conversations-list.model';
import {ApiControllers, ApiEndpointBuilder, EndpointBuilder} from '../../../shared/api.constants';

@Injectable()
export class UsersService extends AbstractService {

  public constructor(http: HttpClient, @Inject(ApiEndpointBuilder) private builder: EndpointBuilder) {
    super(http);
    builder.withController(ApiControllers.Users);
  }

  public getConversations(request: ConversationsQuery, handler: OnConversationsHandler): void {
    const endpoint = this.builder
      .withParameter(request.user)
      .withAction('conversations')
      .build();

    this.http.get<ConversationsListModel>(endpoint)
      .pipe(catchError(this.handleError))
      .pipe(takeUntil(this.stop$))
      .subscribe(
        conversations => handler.onConversationsFetchedSuccess(conversations),
        error => handler.onConversationsFetchedFailed(error));
  }
}
