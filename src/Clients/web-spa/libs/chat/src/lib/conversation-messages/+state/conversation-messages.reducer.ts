import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as ConversationMessagesActions from './conversation-messages.actions';
import { ConversationMessagesList } from '../shared/models/conversation-messages-list.model';
import { ConversationMessage } from '../shared/models/conversation-message.model';
import { defaultModel } from '../../../../../storage/src/lib/common/defaults/model.default';

export const CONVERSATION_MESSAGES_FEATURE_KEY = 'conversationMessages';

export interface State extends EntityState<ConversationMessage> {
  messages: ConversationMessagesList
}

export interface ConversationMessagesPartialState {
  readonly [CONVERSATION_MESSAGES_FEATURE_KEY]: State;
}

export const conversationMessagesAdapter: EntityAdapter<ConversationMessage> = createEntityAdapter<ConversationMessage>();

export const initialState: State = conversationMessagesAdapter.getInitialState({
  messages: defaultModel(),
  loaded: false
});

const conversationMessagesReducer = createReducer(
  initialState,
  on(ConversationMessagesActions.getAllSuccess, (state, { messages }) => ({ ...state, messages })),
  on(ConversationMessagesActions.getAllFailure, () => ({ ...initialState }))
);

export function reducer(state: State | undefined, action: Action) {
  return conversationMessagesReducer(state, action);
}
