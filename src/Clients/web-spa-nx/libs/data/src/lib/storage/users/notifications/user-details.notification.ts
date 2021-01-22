import { HttpErrorResponse } from '@angular/common/http';

import { UserModel } from '@wlodzimierz/domain/src/lib/models/user.model';

export interface UserDetailsNotification {

  onUserDetailsSuccess(user: UserModel): void;

  onUserDetailsFailed(error: HttpErrorResponse): void;
}
