import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {catchError, takeUntil} from 'rxjs/operators';

import {AuthService} from '../../../../application/storage/users/services/auth.service';
import {SignInCommand} from '../../../../application/storage/users/commands/sign-in.command';
import {AbstractService} from '../../abstract.service';
import {UserSignInNotification} from '../../../../application/storage/users/notifications/user-sign-in.notification';
import {VerifyCommand} from '../../../../application/storage/users/commands/verify.command';
import {SignUpCommand} from '../../../../application/storage/users/commands/sign-up.command';
import {UserSignUpNotification} from '../../../../application/storage/users/notifications/user-sign-up.notification';
import {UserVerifyNotification} from '../../../../application/storage/users/notifications/user-verify.notification';
import {JwtTokenModel} from '../../../../domain/models/jwt-token.model';
import {UserModel} from '../../../../domain/models/user.model';
import {UsersEndpoints} from '../users.endpoints';

@Injectable()
export class AuthServiceImpl extends AbstractService implements AuthService {

  public constructor(http: HttpClient) {
    super(http);
  }

  public signIn(request: SignInCommand, notification: UserSignInNotification): void {
    this.http.post<JwtTokenModel>(UsersEndpoints.UsersSignIn, request.user)
      .pipe(catchError(this.handleError))
      .pipe(takeUntil(this.stop$))
      .subscribe(token => notification.onSignInSuccess(token), error => notification.onSignInFailed(error));
  }

  public signUp(request: SignUpCommand, notification: UserSignUpNotification): void {
    this.http.post<JwtTokenModel>(UsersEndpoints.UsersSignUp, request.user)
      .pipe(catchError(this.handleError))
      .pipe(takeUntil(this.stop$))
      .subscribe(token => notification.onSignUpSuccess(token), error => notification.onSignUpFailed(error));
  }

  public verify(request: VerifyCommand, notification: UserVerifyNotification): void {
    const token: JwtTokenModel = request.token;

    this.http.post<UserModel>(UsersEndpoints.UsersVerify, token, this.withAuthorization(token))
      .pipe(catchError(this.handleError))
      .pipe(takeUntil(this.stop$))
      .subscribe(user => notification.onVerifySuccess(user), error => notification.onVerifyFailed(error));
  }
}
