import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, takeUntil } from 'rxjs/operators';

import { AbstractService } from '@wlodzimierz/infrastructure/src/lib/common/services/abstract.service';
import { AuthService } from '@wlodzimierz/application/src/lib/storage/users/services/auth.service';
import { SignInCommand } from '@wlodzimierz/application/src/lib/storage/users/commands/sign-in.command';
import { SignInNotification } from '@wlodzimierz/domain/src/lib/notifications/users/sign-in.notification';
import { JwtTokenModel } from '@wlodzimierz/domain/src/lib/models/jwt-token.model';
import { SignUpCommand } from '@wlodzimierz/application/src/lib/storage/users/commands/sign-up.command';
import { SignUpNotification } from '@wlodzimierz/domain/src/lib/notifications/users/sign-up.notification';
import { VerifyCommand } from '@wlodzimierz/application/src/lib/storage/users/commands/verify.command';
import { VerifyNotification } from '@wlodzimierz/domain/src/lib/notifications/users/verify.notification';
import { UserModel } from '@wlodzimierz/domain/src/lib/models/user.model';
import { UsersEndpointBuilder } from '@wlodzimierz/infrastructure/src/lib/storage/users/users-endpoint.builder';
import { AbstractEndpointBuilder } from '@wlodzimierz/application/src/lib/common/endpoints/abstract-endpoint.builder';

@Injectable()
export class AuthServiceImpl extends AbstractService implements AuthService {
  public constructor(http: HttpClient, @Inject(UsersEndpointBuilder) private endpointBuilder: AbstractEndpointBuilder) {
    super(http);
  }

  public signIn(request: SignInCommand, notification: SignInNotification): void {
    const endpoint = this.endpointBuilder
      .withParameter('')
      .withAction('SignIn')
      .build();

    this.http
      .post<JwtTokenModel>(endpoint.url, request.user)
      .pipe(catchError(this.handleError), takeUntil(this.subject))
      .subscribe(
        (token: JwtTokenModel) => notification.onSignInSuccess(token),
        (error) => notification.onSignInFailed(error)
      );
  }

  public signUp(request: SignUpCommand, notification: SignUpNotification): void {
    const endpoint = this.endpointBuilder
      .withParameter('')
      .withAction('SignUp')
      .build();

    this.http
      .post<JwtTokenModel>(endpoint.url, request.user)
      .pipe(catchError(this.handleError), takeUntil(this.subject))
      .subscribe(
        (token: JwtTokenModel) => notification.onSignUpSuccess(token),
        (error) => notification.onSignUpFailed(error)
      );
  }

  public verify(request: VerifyCommand, notification: VerifyNotification): void {
    const endpoint = this.endpointBuilder
      .withParameter('')
      .withAction('Verify')
      .build();

    const token: JwtTokenModel = request.token;

    this.http
      .post<UserModel>(endpoint.url, token, this.withAuthorization(token))
      .pipe(catchError(this.handleError), takeUntil(this.subject))
      .subscribe(
        (user: UserModel) => notification.onVerifySuccess(user),
        (error) => notification.onVerifyFailed(error)
      );
  }
}
