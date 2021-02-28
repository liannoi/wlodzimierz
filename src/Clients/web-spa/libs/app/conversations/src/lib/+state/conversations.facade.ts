import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { select, Store } from '@ngrx/store';

import * as ConversationsActions from './conversations.actions';
import * as ConversationsSelectors from './conversations.selectors';
import { ConversationsList } from '../shared/models/conversations-list.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserModel } from '../../../../users/src/lib/shared/models/user.model';

@Injectable()
export class ConversationsFacade {
  public conversations$: Observable<ConversationsList> = this.store.pipe(select(ConversationsSelectors.getConversations));

  public constructor(private store: Store) {
  }

  public getAll(currentUser: UserModel): void {
    this.store.dispatch(ConversationsActions.getAll({ currentUser }));
  }
}
