import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, takeUntil } from 'rxjs/operators';

import { AbstractService } from '@wlodzimierz/infrastructure/src/lib/common/abstract.service';
import { AuthService } from '@wlodzimierz/data/src/lib/storage/users/services/auth.service';
import { SignInCommand } from '@wlodzimierz/data/src/lib/storage/users/commands/sign-in.command';
import { UserSignInNotification } from '@wlodzimierz/data/src/lib/storage/users/notifications/user-sign-in.notification';
import { JwtTokenModel } from '@wlodzimierz/domain/src/lib/models/jwt-token.model';
import { SignUpCommand } from '@wlodzimierz/data/src/lib/storage/users/commands/sign-up.command';
import { UserSignUpNotification } from '@wlodzimierz/data/src/lib/storage/users/notifications/user-sign-up.notification';
import { VerifyCommand } from '@wlodzimierz/data/src/lib/storage/users/commands/verify.command';
import { UserVerifyNotification } from '@wlodzimierz/data/src/lib/storage/users/notifications/user-verify.notification';
import { UserModel } from '@wlodzimierz/domain/src/lib/models/user.model';

Injectable();

export class AuthServiceImpl extends AbstractService implements AuthService {

  public constructor(http: HttpClient, @Inject('api_url') public api: string) {
    super(http);
  }

  public signIn(request: SignInCommand, notification: UserSignInNotification): void {
    this.http.post<JwtTokenModel>(`${this.api}/Users/SignIn`, request.user)
      .pipe(catchError(this.handleError))
      .pipe(takeUntil(this.stop$))
      .subscribe(token => notification.onSignInSuccess(token), error => notification.onSignInFailed(error));
  }

  public signUp(request: SignUpCommand, notification: UserSignUpNotification): void {
    this.http.post<JwtTokenModel>(`${this.api}/Users/SignUp`, request.user)
      .pipe(catchError(this.handleError))
      .pipe(takeUntil(this.stop$))
      .subscribe(token => notification.onSignUpSuccess(token), error => notification.onSignUpFailed(error));
  }

  public verify(request: VerifyCommand, notification: UserVerifyNotification): void {
    const token: JwtTokenModel = request.token;

    this.http.post<UserModel>(`${this.api}/Users/Verify`, token, this.withAuthorization(token))
      .pipe(catchError(this.handleError))
      .pipe(takeUntil(this.stop$))
      .subscribe(user => notification.onVerifySuccess(user), error => notification.onVerifyFailed(error));
  }
}
