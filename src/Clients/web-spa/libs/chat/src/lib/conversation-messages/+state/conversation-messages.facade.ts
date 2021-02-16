import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import * as ConversationMessagesActions from './conversation-messages.actions';
import * as ConversationMessagesSelectors from './conversation-messages.selectors';
import { Conversation } from '../../conversations/shared/models/conversation.model';

@Injectable()
export class ConversationMessagesFacade {
  public messages$ = this.store.pipe(select(ConversationMessagesSelectors.getMessages));

  public constructor(private store: Store) {
  }

  public getAll(conversation: Conversation): void {
    this.store.dispatch(ConversationMessagesActions.getAll({ conversation }));
  }
}
