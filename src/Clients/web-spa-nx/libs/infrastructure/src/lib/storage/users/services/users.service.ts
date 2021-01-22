import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { catchError, takeUntil } from 'rxjs/operators';

import { AbstractService } from '@wlodzimierz/infrastructure/src/lib/common/abstract.service';
import { UsersService } from '@wlodzimierz/data/src/lib/storage/users/services/users.service';
import { DetailsQuery } from '@wlodzimierz/data/src/lib/storage/users/queries/details-query';
import { UserDetailsNotification } from '@wlodzimierz/data/src/lib/storage/users/notifications/user-details.notification';
import { UserModel } from '@wlodzimierz/domain/src/lib/models/user.model';
import { ConversationsQuery } from '@wlodzimierz/data/src/lib/storage/users/queries/conversations-query';
import { ConversationsNotification } from '@wlodzimierz/data/src/lib/storage/users/notifications/conversations-notification';
import { ConversationsListModel } from '@wlodzimierz/domain/src/lib/models/conversations-list.model';

@Injectable()
export class UsersServiceImpl extends AbstractService implements UsersService {

  public constructor(http: HttpClient, @Inject('api_url') public api: string) {
    super(http);
  }

  public getById(request: DetailsQuery, notification: UserDetailsNotification): void {
    this.http.get<UserModel>(`${this.api}/Users`, { params: { id: request.userId } })
      .pipe(catchError(this.handleError))
      .pipe(takeUntil(this.stop$))
      .subscribe(user => notification.onUserDetailsSuccess(user), error => notification.onUserDetailsFailed(error));
  }

  public getConversations(request: ConversationsQuery, notification: ConversationsNotification): void {
    const url = `${this.api}Users/${request.userId}/conversations`;

    this.http.get<ConversationsListModel>(url)
      .pipe(catchError(this.handleError))
      .pipe(takeUntil(this.stop$))
      .subscribe(result => notification.onConversationsSuccess(result), error => notification.onConversationsFailed(error));
  }
}
