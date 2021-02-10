import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CHAT_FEATURE_KEY, ChatPartialState, State } from './chat.reducer';

export const getChatState = createFeatureSelector<ChatPartialState, State>(CHAT_FEATURE_KEY);

export const getCurrentConversation = createSelector(getChatState, (state: State) => state.currentConversation);
export const getAllMessages = createSelector(getChatState, (state: State) => state.allMessages);
export const getLastMessage = createSelector(getChatState, (state: State) => state.lastMessage);
