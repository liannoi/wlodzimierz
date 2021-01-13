import {HttpErrorResponse} from '@angular/common/http';

import {JwtTokenModel} from '../../models/jwt-token.model';

export interface OnSignUp {

  onSignUpSuccess(token: JwtTokenModel): void;

  onSignUpFailed(error: HttpErrorResponse): void;
}
