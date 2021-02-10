import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { of } from 'rxjs';
import { catchError, concatMap, map, tap } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as AuthActions from './auth.actions';
import { AuthService } from '../shared/services/auth.service';
import { JwtTokenService } from '../shared/services/jwt-token.service';
import { AuthFormFacade } from '../shared/form/auth-form.facade';
import { AuthFacade } from './auth.facade';
import { RemoteResult } from '../../../../storage/src/lib/remote/models/remote-result.model';

@Injectable()
export class AuthEffects {
  signIn = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signIn),
      concatMap((action) =>
        this.authService.signIn(action.user).pipe(
          map((response) => AuthActions.signInSuccess({ token: response, shouldRemember: action.user.shouldRemember })),
          catchError((error) => of(AuthActions.signInFailure(error)))
        )
      )
    )
  );

  signInSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signInSuccess),
        tap((action) => {
          this.tokenService.writeExpires(action.token, action.shouldRemember);
          this.authFacade.verify();
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  signInFailure = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signInFailure),
        tap(() => this.formFacade.failureSignIn())
      ),
    { dispatch: false }
  );

  signUp = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      concatMap((action) =>
        this.authService.signUp(action.user).pipe(
          map((response) => AuthActions.signUpSuccess({ token: response })),
          catchError((error: RemoteResult) => of(AuthActions.signUpFailure(error)))
        )
      )
    )
  );

  signUpSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signUpSuccess),
        tap((action) => {
          this.tokenService.writeExpires(action.token, true);
          this.authFacade.verify();
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  signUpFailure = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signUpFailure),
        tap((action) => this.formFacade.failureSignUp(action.error))
      ),
    { dispatch: false }
  );

  signOut = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signOut),
      concatMap(() => this.tokenService.clear().pipe(map(() => AuthActions.signOutSuccess())))
    )
  );

  signOutSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signOutSuccess),
        tap(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );

  verify = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.verify),
      concatMap(() =>
        this.authService.verify().pipe(
          map((result) => AuthActions.verifySuccess({ currentUser: result, token: this.tokenService.read() })),
          catchError((error) => of(AuthActions.verifyFailure(error)))
        )
      )
    )
  );

  public constructor(
    private actions$: Actions,
    private authService: AuthService,
    private tokenService: JwtTokenService,
    private authFacade: AuthFacade,
    private router: Router,
    private formFacade: AuthFormFacade
  ) {
  }
}
