import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as AuthActions from './auth.actions';
import { UsersService } from '../shared/services/users.service';

@Injectable()
export class AuthEffects {
  verifySuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.verifySuccess),
      concatMap(action =>
        this.usersService.signIn(action.user).pipe(
          map(() => AuthActions.verifySuccess({ user: action.user })),
          catchError(error => of(AuthActions.verifyFailure(error)))
        )
      )
    )
  );

  public constructor(private actions$: Actions, private usersService: UsersService) {
  }
}

/*
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as AuthFeature from './auth.reducer';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return AuthActions.loadAuthSuccess({ auth: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return AuthActions.loadAuthFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
*/
