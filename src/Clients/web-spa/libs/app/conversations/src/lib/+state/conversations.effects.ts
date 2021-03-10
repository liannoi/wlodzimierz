import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { catchError, concatMap, delay, map, tap } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as ConversationsActions from './conversations.actions';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UsersService } from '../../../../users/src/lib/shared/storage/services/users.service';
import { ConversationsService } from '../shared/storage/conversations.service';
import { Router } from '@angular/router';
import { ConversationsFacade } from './conversations.facade';

@Injectable()
export class ConversationsEffects {
  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConversationsActions.getAll),
      concatMap((action) =>
        this.usersService.getConversations(action.currentUser).pipe(
          map((response) =>
            ConversationsActions.getAllSuccess({ conversations: response })
          ),
          catchError((error) => of(ConversationsActions.getAllFailure(error)))
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConversationsActions.create),
      concatMap((action) =>
        this.conversationsService.create(action.conversation).pipe(
          map(() => ConversationsActions.createSuccess()),
          catchError((error) => of(ConversationsActions.createFailure(error)))
        )
      )
    )
  );

  createSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ConversationsActions.createSuccess),
        tap(() => this.router.navigate(['/app']))
      ),
    { dispatch: false }
  );

  public constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private conversationsService: ConversationsService,
    private router: Router
  ) {}
}
