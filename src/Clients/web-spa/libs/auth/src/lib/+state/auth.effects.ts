import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { of } from 'rxjs';
import { catchError, concatMap, map, tap } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { AuthFacade } from '@wlodzimierz/auth';

import * as AuthActions from './auth.actions';
import { AuthService } from '../shared/services/auth.service';
import { JwtTokenService } from '../shared/services/jwt-token.service';
import { AuthFormService } from '../shared/services/auth-form.service';

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
        tap(() => this.authFormService.failure())
      ),
    { dispatch: false }
  );

  signOut = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signOut),
      concatMap(() =>
        this.tokenService.clear().pipe(
          map(() => AuthActions.signOutSuccess()))
      )
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
    private authFormService: AuthFormService
  ) {
  }
}
