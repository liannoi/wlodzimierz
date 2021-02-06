import { Injectable } from '@angular/core';

import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';

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
          map(result => {
            const actionResult = AuthActions.signInSuccess({ token: result });
            const date = new Date();
            const minutes = action.user.shouldRemember ? 15 : 5;
            date.setMinutes(date.getMinutes() + minutes);
            this.tokenService.write(actionResult.token.value, date);

            return actionResult;
          }),
          catchError(error => of(AuthActions.verifyFailure(error)))
        )
      )
    )
  );

  public constructor(private actions$: Actions, private usersService: AuthService, private tokenService: JwtTokenService) {
  }
}
