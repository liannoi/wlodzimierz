import {HttpErrorResponse} from '@angular/common/http';

import {UserModel} from '../../../../domain/models/user.model';

export interface UserVerifyNotification {

  onVerifySuccess(user: UserModel): void;

  onVerifyFailed(error: HttpErrorResponse): void;
}
