import {OnDispose} from '../../../common/on-dispose.interface';
import {DetailsQuery} from '../queries/details.query';
import {UserDetailsNotification} from '../notifications/user-details.notification';

export interface UsersService extends OnDispose {

  getById(request: DetailsQuery, notification: UserDetailsNotification): void;
}
