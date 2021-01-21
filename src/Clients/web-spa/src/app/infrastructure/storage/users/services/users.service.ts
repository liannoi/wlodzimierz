import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {catchError, takeUntil} from 'rxjs/operators';

import {AbstractService} from '../../abstract.service';
import {UsersService} from '../../../../application/storage/users/services/users.service';
import {DetailsQuery} from '../../../../application/storage/users/queries/details.query';
import {UserDetailsNotification} from '../../../../application/storage/users/notifications/user-details.notification';
import {UsersController} from '../users.endpoints';
import {UserModel} from '../../../../domain/models/user.model';

@Injectable()
export class UsersServiceImpl extends AbstractService implements UsersService {

  public constructor(http: HttpClient) {
    super(http);
  }

  public getById(request: DetailsQuery, notification: UserDetailsNotification): void {
    this.http.get<UserModel>(UsersController, {params: {id: request.userId}})
      .pipe(catchError(this.handleError))
      .pipe(takeUntil(this.stop$))
      .subscribe(user => notification.onUserDetailsSuccess(user), error => notification.onUserDetailsFailed(error));
  }
}
