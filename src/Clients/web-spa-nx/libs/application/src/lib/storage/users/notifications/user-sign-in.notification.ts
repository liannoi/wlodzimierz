import { HttpErrorResponse } from '@angular/common/http';

import { JwtTokenModel } from '@wlodzimierz/domain/src/lib/models/jwt-token.model';

export interface UserSignInNotification {

  onSignInSuccess(token: JwtTokenModel): void;

  onSignInFailed(error: HttpErrorResponse): void;
}
