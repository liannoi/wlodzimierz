import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  CONVERSATION_MESSAGES_FEATURE_KEY,
  ConversationMessagesPartialState,
  State,
} from './conversation-messages.reducer';

const getConversationMessagesState = createFeatureSelector<
  ConversationMessagesPartialState,
  State
>(CONVERSATION_MESSAGES_FEATURE_KEY);

export const getMessages = createSelector(
  getConversationMessagesState,
  (state: State) => state.messages
);
