import {HttpErrorResponse} from '@angular/common/http';

import {UserModel} from '../../models/user.model';

export interface OnVerify {

  onVerifySuccess(user: UserModel): void;

  onVerifyFailed(error: HttpErrorResponse): void;
}