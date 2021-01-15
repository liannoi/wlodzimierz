import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, takeUntil} from 'rxjs/operators';
import {CookieService} from 'ngx-cookie-service';

import {SignInCommand} from './commands/sign-in/sign-in.command';
import {OnSignInHandler} from './commands/sign-in/on-sign-in.handler';
import {JwtTokenModel} from './models/jwt-token.model';
import {ApiEndpoints} from '../../shared/api.constants';
import {AbstractService} from '../../shared/abstract.service';
import {ApplicationOptions} from '../../shared/app.constants';
import {SignUpCommand} from './commands/sign-up/sign-up.command';
import {OnSignUpHandler} from './commands/sign-up/on-sign-up.handler';
import {VerifyCommand} from './commands/verify/verify.command';
import {OnVerifyHandler} from './commands/verify/on-verify.handler';
import {UserModel} from './models/user.model';

@Injectable()
export class AuthService extends AbstractService {

  public constructor(http: HttpClient, private cookie: CookieService) {
    super(http);
  }

  ///////////////////////////////////////////////////////////////////////////
  // Commands
  ///////////////////////////////////////////////////////////////////////////

  public signIn(request: SignInCommand, handler: OnSignInHandler): void {
    this.http.post<JwtTokenModel>(ApiEndpoints.UsersSignIn, request.user)
      .pipe(catchError(this.handleError))
      .pipe(takeUntil(this.stop$))
      .subscribe(token => handler.onSignInSuccess(token), error => handler.onSignInFailed(error));
  }

  public signUp(request: SignUpCommand, handler: OnSignUpHandler): void {
    this.http.post<JwtTokenModel>(ApiEndpoints.UsersSignUp, request.user)
      .pipe(catchError(this.handleError))
      .pipe(takeUntil(this.stop$))
      .subscribe(token => handler.onSignUpSuccess(token), error => handler.onSignUpFailed(error));
  }

  public verify(request: VerifyCommand, handler: OnVerifyHandler): void {
    const token: JwtTokenModel = request.token;

    this.http.post<UserModel>(ApiEndpoints.UsersVerify, token, this.withAuthorization(token))
      .pipe(catchError(this.handleError))
      .pipe(takeUntil(this.stop$))
      .subscribe(user => handler.onVerifySuccess(user), error => handler.onVerifyFailed(error));
  }

  ///////////////////////////////////////////////////////////////////////////
  // Methods for working with JWT token
  ///////////////////////////////////////////////////////////////////////////

  public checkToken(): boolean {
    return this.cookie.check(ApplicationOptions.JwtToken);
  }

  public readToken(): JwtTokenModel {
    return {value: this.cookie.get(ApplicationOptions.JwtToken)};
  }

  // tslint:disable-next-line:no-unnecessary-initializer
  public writeToken(token: JwtTokenModel, expires: Date | undefined = undefined) {
    this.cookie.set(ApplicationOptions.JwtToken, token.value, {path: '/', expires});
  }

  public clearToken() {
    this.cookie.delete(ApplicationOptions.JwtToken);
  }

  public onDispose(): void {
    this.stop$.next();
    this.stop$.complete();
  }

  private withAuthorization(token: JwtTokenModel): { headers: HttpHeaders } {
    return {headers: new HttpHeaders({Authorization: `Bearer ${token.value}`})};
  }
}
