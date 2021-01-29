import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, takeUntil } from 'rxjs/operators';

import { AbstractService } from '@wlodzimierz/infrastructure/src/lib/common/abstract.service';
import { UsersService } from '@wlodzimierz/application/src/lib/storage/users/services/users.service';
import { DetailsQuery } from '@wlodzimierz/application/src/lib/storage/users/queries/details-query';
import { DetailsNotification } from '@wlodzimierz/domain/src/lib/notifications/users/details.notification';
import { UserModel } from '@wlodzimierz/domain/src/lib/models/user.model';
import { ConversationsQuery } from '@wlodzimierz/application/src/lib/storage/users/queries/conversations-query';
import { ConversationsNotification } from '@wlodzimierz/domain/src/lib/notifications/users/conversations-notification';
import { ConversationsListModel } from '@wlodzimierz/domain/src/lib/models/conversations-list.model';
import { UsersEndpointBuilder } from '@wlodzimierz/infrastructure/src/lib/storage/users/users-endpoint.builder';

@Injectable()
export class UsersServiceImpl extends AbstractService implements UsersService {
  public constructor(http: HttpClient, private endpointBuilder: UsersEndpointBuilder) {
    super(http);
  }

  public getById(request: DetailsQuery, notification: DetailsNotification): void {
    const endpoint = this.endpointBuilder.withAction(request.userId).build();

    this.http
      .get<UserModel>(endpoint.url)
      .pipe(catchError(this.handleError), takeUntil(this.subject))
      .subscribe(
        (user: UserModel) => notification.onUserDetailsSuccess(user),
        (error) => notification.onUserDetailsFailed(error)
      );
  }

  public getConversations(request: ConversationsQuery, notification: ConversationsNotification): void {
    const endpoint = this.endpointBuilder.withParameter(request.userId).withAction('Conversations').build();

    this.http
      .get<ConversationsListModel>(endpoint.url)
      .pipe(catchError(this.handleError), takeUntil(this.subject))
      .subscribe(
        (result: ConversationsListModel) => notification.onConversationsSuccess(result),
        (error) => notification.onConversationsFailed(error)
      );
  }
}
