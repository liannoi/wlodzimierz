import {HttpErrorResponse} from '@angular/common/http';

import {JwtTokenModel} from '../../../../domain/models/jwt-token.model';

export interface UserSignInNotification {

  onSignInSuccess(token: JwtTokenModel): void;

  onSignInFailed(error: HttpErrorResponse): void;
}
