import { Router } from '@angular/router';
import { Inject, Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, concatMap, map, tap } from 'rxjs/operators';

import { UsersFacade } from '@wlodzimierz/app/users';

import * as UsersActions from './users.actions';
import { JwtToken } from '../shared/models/jwt-token.model';
import { AuthService } from '../shared/storage/services/auth.service';
import { AuthFormFacade } from '../shared/storage/forms/auth-form.facade';
import { JwtTokenService } from '../shared/storage/services/jwt-token.service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { RemoteResult } from '../../../../../shared/storage/src/lib/remote/errors/remote-result.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CookiesService } from '../../../../../shared/storage/src/lib/local/cookies.service';

@Injectable()
export class UsersEffects {
  verify$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.verify),
      concatMap(() =>
        this.authService.verify().pipe(
          map((response) =>
            UsersActions.verifySuccess({
              currentUser: response,
              token: this.tokenService.read()
            })
          ),
          catchError((error) => of(UsersActions.verifyFailure(error)))
        )
      )
    )
  );

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.signIn),
      concatMap((action) =>
        this.authService.signIn(action.currentUser).pipe(
          map((response) =>
            UsersActions.signInSuccess({
              token: response,
              shouldRemember: action.currentUser.shouldRemember
            })
          ),
          catchError((error) => of(UsersActions.signInFailure(error)))
        )
      )
    )
  );

  signInSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UsersActions.signInSuccess),
        tap((action) => {
          this.tokenService.writeExpires(
            action.token.value,
            action.shouldRemember
          );
          this.usersFacade.verify();
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  signInFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UsersActions.signInFailure),
        tap(() => this.formFacade.failureSignIn())
      ),
    { dispatch: false }
  );

  signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.signOut),
      concatMap(() =>
        this.tokenService.clear().pipe(map(() => UsersActions.signOutSuccess()))
      )
    )
  );

  signOutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UsersActions.signOutSuccess),
        tap(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.signUp),
      concatMap((action) =>
        this.authService.signUp(action.currentUser).pipe(
          map((response) => UsersActions.signUpSuccess({ token: response })),
          catchError((error: RemoteResult) =>
            of(UsersActions.signUpFailure(error))
          )
        )
      )
    )
  );

  signUpSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UsersActions.signUpSuccess),
        tap((action) => {
          this.tokenService.writeExpires(action.token.value, true);
          this.usersFacade.verify();
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  signUpFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UsersActions.signUpFailure),
        tap((action) => this.formFacade.failureSignUp(action.error))
      ),
    { dispatch: false }
  );

  public constructor(
    private actions$: Actions,
    private router: Router,
    @Inject(JwtTokenService) private tokenService: CookiesService<JwtToken>,
    private authService: AuthService,
    private formFacade: AuthFormFacade,
    private usersFacade: UsersFacade
  ) {
  }
}
