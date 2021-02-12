import { Inject, Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';

import * as UsersActions from './users.actions';
import { AuthService } from '../shared/services/auth.service';
import { JwtToken } from '../shared/models/jwt-token.model';
import { JwtTokenService } from '../shared/services/jwt-token.service';
import { Cookie } from '../../../../storage/src/lib/local/models/cookie.model';

@Injectable()
export class UsersEffects {
  verify = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.verify),
      concatMap(() =>
        this.authService.verify().pipe(
          map((response) => UsersActions.verifySuccess({ currentUser: response, token: this.tokenService.read() })),
          catchError((error) => of(UsersActions.verifyFailure(error)))
        )
      )
    )
  );

  public constructor(
    private actions$: Actions,
    private authService: AuthService,
    @Inject(JwtTokenService) private tokenService: Cookie<JwtToken>
  ) {
  }
}
