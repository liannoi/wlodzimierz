import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as ChatActions from './chat.actions';
import * as ChatSelectors from './chat.selectors';
import { Conversation } from '../conversations/shared/models/conversation.model';
import { ConversationMessage } from '../conversation-messages/shared/conversation-message.model';
import { AbstractPaginatedList } from '../../../../storage/src/lib/common/paging/abstract-paginated-list.model';

@Injectable()
export class ChatFacade {
  public currentConversation$: Observable<Conversation> = this.store.pipe(select(ChatSelectors.getCurrentConversation));
  public allMessages$: Observable<AbstractPaginatedList<ConversationMessage>> = this.store.pipe(select(ChatSelectors.getAllMessages));
  public lastMessage$: Observable<ConversationMessage> = this.store.pipe(select(ChatSelectors.getLastMessage));

  public constructor(private store: Store) {
  }

  public selectConversation(currentConversation: Conversation) {
    this.store.dispatch(ChatActions.selectConversation({ currentConversation }));
  }

  public loadLastMessage(currentConversation: Conversation) {
    this.store.dispatch(ChatActions.loadLastMessage({ currentConversation }));
  }
}
