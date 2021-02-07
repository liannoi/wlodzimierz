import { Injectable } from '@angular/core';

import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { go } from '@wlodzimierz/ngrx-router';

import * as AuthActions from './auth.actions';
import { AuthService } from '../shared/services/auth.service';
import { JwtTokenService } from '../shared/services/jwt-token.service';

@Injectable()
export class AuthEffects {
  verify = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.verify),
      concatMap(action =>
        this.usersService.verify(action.token).pipe(
          map(result => AuthActions.verifySuccess({ user: result })),
          catchError(error => of(AuthActions.verifyFailure(error)))
        )
      )
    )
  );

  signIn = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signIn),
      concatMap(action =>
        this.usersService.signIn(action.user).pipe(
          map(response => {
            const actionResult = AuthActions.signInSuccess({ token: response });
            this.tokenService.writeExpires(action.user, actionResult.token);

            return go({ to: { path: ['/'] } });
          }),
          catchError(error => of(AuthActions.signInFailure(error)))
        )
      )
    )
  );

  public constructor(
    private actions$: Actions,
    private usersService: AuthService,
    private tokenService: JwtTokenService
  ) {
  }
}
