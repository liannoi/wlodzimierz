import {JwtTokenModel} from '../../../../domain/models/jwt-token.model';
import {HttpErrorResponse} from '@angular/common/http';

export interface UserSignUpNotification {

  onSignUpSuccess(token: JwtTokenModel): void;

  onSignUpFailed(error: HttpErrorResponse): void;
}
