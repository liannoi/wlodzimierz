import { HttpErrorResponse } from '@angular/common/http';

import { JwtTokenModel } from '@wlodzimierz/domain/src/lib/models/jwt-token.model';

export interface UserSignUpNotification {

  onSignUpSuccess(token: JwtTokenModel): void;

  onSignUpFailed(error: HttpErrorResponse): void;
}
