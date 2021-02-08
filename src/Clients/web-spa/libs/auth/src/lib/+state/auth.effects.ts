import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { catchError, concatMap, map, tap } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as AuthActions from './auth.actions';
import { AuthService } from '../shared/services/auth.service';
import { JwtTokenService } from '../shared/services/jwt-token.service';
import { Router } from '@angular/router';
import { AuthFacade } from '@wlodzimierz/auth';

@Injectable()
export class AuthEffects {
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

  public constructor(
    private actions$: Actions,
    private authService: AuthService,
    private tokenService: JwtTokenService,
    private authFacade: AuthFacade,
    private router: Router
  ) {
  }
}
