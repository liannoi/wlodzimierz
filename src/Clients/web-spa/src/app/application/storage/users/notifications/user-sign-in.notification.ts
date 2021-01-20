import {JwtTokenModel} from '../../../../domain/models/jwt-token.model';
import {HttpErrorResponse} from '@angular/common/http';

export interface UserSignInNotification {

  onSignInSuccess(token: JwtTokenModel): void;

  onSignInFailed(error: HttpErrorResponse): void;
}
