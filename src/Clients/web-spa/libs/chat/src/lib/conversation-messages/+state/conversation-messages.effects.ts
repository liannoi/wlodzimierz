import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as ConversationMessagesActions from './conversation-messages.actions';
import { ConversationsService } from '../../conversations/shared/services/conversations.service';

@Injectable()
export class ConversationMessagesEffects {
  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConversationMessagesActions.getAll),
      concatMap((action) =>
        this.conversationsService.getMessages(action.conversation).pipe(
          map((response) => ConversationMessagesActions.getAllSuccess({ messages: response })),
          catchError((error) => of(ConversationMessagesActions.getAllFailure(error)))
        )
      )
    )
  );

  public constructor(private actions$: Actions, private conversationsService: ConversationsService) {
  }
}
