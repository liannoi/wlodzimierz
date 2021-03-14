import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CONVERSATIONS_FEATURE_KEY, ConversationsPartialState, State } from './conversations.reducer';

const getConversationsState = createFeatureSelector<ConversationsPartialState,
  State>(CONVERSATIONS_FEATURE_KEY);

export const getConversations = createSelector(
  getConversationsState,
  (state: State) => state.conversations
);
