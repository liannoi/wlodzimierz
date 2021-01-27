import { HttpErrorResponse } from '@angular/common/http';

import { UserModel } from '@wlodzimierz/domain/src/lib/models/user.model';

export interface VerifyNotification {
  onVerifySuccess(user: UserModel): void;

  onVerifyFailed(error: HttpErrorResponse): void;
}
