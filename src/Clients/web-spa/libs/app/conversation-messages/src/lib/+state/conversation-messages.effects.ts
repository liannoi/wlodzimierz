import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { catchError, concatMap, map, tap } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as ConversationMessagesActions from './conversation-messages.actions';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ConversationsService } from '../../../../conversations/src/lib/shared/storage/conversations.service';
import { ConversationMessagesService } from '../shared/storage/conversation-messages.service';
import { ConversationMessagesFacade } from './conversation-messages.facade';

@Injectable()
export class ConversationMessagesEffects {
  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConversationMessagesActions.getAll),
      concatMap((action) =>
        this.conversationsService.getMessages(action.conversation).pipe(
          map((response) =>
            ConversationMessagesActions.getAllSuccess({ messages: response })
          ),
          catchError((error) =>
            of(ConversationMessagesActions.getAllFailure(error))
          )
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConversationMessagesActions.create),
      concatMap((action) =>
        this.messagesService.create(action.message).pipe(
          map((response) =>
            ConversationMessagesActions.createSuccess({
              conversation: action.message.conversation
            })
          ),
          catchError((error) =>
            of(ConversationMessagesActions.createFailure(error))
          )
        )
      )
    )
  );

  createSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ConversationMessagesActions.createSuccess),
        tap((action) => this.messagesFacade.getAll(action.conversation))
      ),
    { dispatch: false }
  );

  public constructor(
    private actions$: Actions,
    private conversationsService: ConversationsService,
    private messagesService: ConversationMessagesService,
    private messagesFacade: ConversationMessagesFacade
  ) {
  }
}
