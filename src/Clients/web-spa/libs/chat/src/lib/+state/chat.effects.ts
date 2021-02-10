import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';

import * as ChatActions from './chat.actions';
import { ConversationsService } from '../conversations/shared/services/conversations.service';

@Injectable()
export class ChatEffects {
  loadLastMessage = createEffect(() =>
    this.actions$.pipe(
      ofType(ChatActions.loadLastMessage),
      concatMap((action) =>
        this.conversationsService.getMessages(action.currentConversation).pipe(
          map((response) => ChatActions.loadLastMessageSuccess({ allMessages: response })),
          catchError((error) => of(ChatActions.loadLastMessageFailure(error)))
        )
      )
    )
  );

  public constructor(private actions$: Actions, private conversationsService: ConversationsService) {
  }
}
