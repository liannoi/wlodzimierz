import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {Subject} from 'rxjs';
import {catchError, takeUntil} from 'rxjs/operators';
import {CookieService} from 'ngx-cookie-service';

import {SignInCommand} from '../commands/sign-in/sign-in.command';
import {OnSignIn} from '../commands/sign-in/on-sign-in.interface';
import {JwtTokenModel} from '../models/jwt-token.model';
import {ApiControllers, ApiEndpoints} from '../../../shared/api.constants';
import {AbstractService} from '../../../shared/abstract.service';
import {ApplicationOptions} from '../../../shared/app.constants';
import {SignUpCommand} from '../commands/sign-up/sign-up.command';
import {OnSignUp} from '../commands/sign-up/on-sign-up.interface';
import {VerifyCommand} from '../queries/verify/verify.command';
import {OnVerify} from '../queries/verify/on-verify.interface';
import {UserModel} from '../models/user.model';

@Injectable()
export class AuthService extends AbstractService {

  private stop$: Subject<void> = new Subject<void>();

  public constructor(private http: HttpClient, private cookie: CookieService) {
    super();
  }

  ///////////////////////////////////////////////////////////////////////////
  // Commands
  ///////////////////////////////////////////////////////////////////////////

  public signIn(request: SignInCommand, handler: OnSignIn): void {
    this.http.post<JwtTokenModel>(ApiEndpoints.UsersSignIn, request.user)
      .pipe(catchError(this.handleError))
      .pipe(takeUntil(this.stop$))
      .subscribe(token => handler.onSignInSuccess(token), error => handler.onSignInFailed(error));
  }

  public signUp(request: SignUpCommand, handler: OnSignUp): void {
    this.http.post<JwtTokenModel>(ApiEndpoints.UsersSignUp, request.user)
      .pipe(catchError(this.handleError))
      .pipe(takeUntil(this.stop$))
      .subscribe(token => handler.onSignUpSuccess(token), error => handler.onSignUpFailed(error));
  }

  public verify(request: VerifyCommand, handler: OnVerify) {
    const token: JwtTokenModel = request.token;

    this.http.get<UserModel>(ApiControllers.Users, {
      headers: this.withAuthorization(token),
      params: new HttpParams().set('jwt', token.value)
    }).pipe(catchError(this.handleError))
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

  ///////////////////////////////////////////////////////////////////////////
  // Helpers
  ///////////////////////////////////////////////////////////////////////////

  public onDispose(): void {
    this.stop$.next();
    this.stop$.complete();
  }

  ///////////////////////////////////////////////////////////////////////////
  // Dispose
  ///////////////////////////////////////////////////////////////////////////

  private withAuthorization(token: JwtTokenModel): HttpHeaders {
    return new HttpHeaders({Authorization: `Bearer ${token.value}`});
  }
}
