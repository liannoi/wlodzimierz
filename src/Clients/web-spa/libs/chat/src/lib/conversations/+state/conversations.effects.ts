import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as ConversationsActions from './conversations.actions';
import { UsersService } from '../../../../../users/src/lib/shared/services/users.service';

@Injectable()
export class ConversationsEffects {
  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConversationsActions.getAll),
      concatMap((action) =>
        this.usersService.getConversations(action.currentUser).pipe(
          map((response) => ConversationsActions.getAllSuccess({ conversations: response })),
          catchError((error) => of(ConversationsActions.getAllFailure(error)))
        )
      )
    )
  );

  public constructor(private actions$: Actions, private usersService: UsersService) {
  }
}
