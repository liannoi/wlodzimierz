import {HttpErrorResponse} from '@angular/common/http';

import {JwtTokenModel} from '../../models/jwt-token.model';

export interface OnSignIn {

  onSignInSuccess(token: JwtTokenModel): void;

  onSignInFailed(error: HttpErrorResponse): void;
}
