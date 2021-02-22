import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as ConversationsActions from './conversations.actions';
import { Conversation } from '../shared/models/conversation.model';
import { ConversationsList } from '../shared/models/conversations-list.model';
import { defaultModel } from '../../../../../../shared/storage/src/lib/common/defaults/model.default';

export const CONVERSATIONS_FEATURE_KEY = 'conversations';

export interface State extends EntityState<Conversation> {
  conversations: ConversationsList;
}

export interface ConversationsPartialState {
  readonly [CONVERSATIONS_FEATURE_KEY]: State;
}

export const conversationsAdapter: EntityAdapter<Conversation> = createEntityAdapter<Conversation>();

export const initialState: State = conversationsAdapter.getInitialState({
  conversations: defaultModel(),
  loaded: false
});

const conversationsReducer = createReducer(
  initialState,
  on(ConversationsActions.getAllSuccess, (state, { conversations }) => ({
    ...state,
    conversations
  })),
  on(ConversationsActions.getAllFailure, () => ({ ...initialState }))
);

export function reducer(state: State | undefined, action: Action) {
  return conversationsReducer(state, action);
}
