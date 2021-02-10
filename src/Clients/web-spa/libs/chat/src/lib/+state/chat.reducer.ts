import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as ChatActions from './chat.actions';
import {
  ConversationMessage,
  defaultConversationMessage
} from '../conversation-messages/shared/conversation-message.model';
import { ChatState } from './chat.models';
import { Conversation, defaultConversation } from '../conversations/shared/models/conversation.model';
import {
  ConversationMessagesList,
  defaultConversationMessagesList
} from '../conversation-messages/shared/conversation-messages-list.model';

export const CHAT_FEATURE_KEY = 'chat';

export interface State extends EntityState<ChatState> {
  currentConversation: Conversation,
  allMessages: ConversationMessagesList,
  lastMessage: ConversationMessage,
}

export interface ChatPartialState {
  readonly [CHAT_FEATURE_KEY]: State;
}

export const chatAdapter: EntityAdapter<ChatState> = createEntityAdapter<ChatState>();

export const initialState: State = chatAdapter.getInitialState({
  currentConversation: defaultConversation(),
  allMessages: defaultConversationMessagesList(),
  lastMessage: defaultConversationMessage(),
  loaded: false
});

const chatReducer = createReducer(
  initialState,
  on(ChatActions.selectConversation, (state, { currentConversation: currentConversation }) => ({
    ...state,
    currentConversation
  })),
  on(ChatActions.loadLastMessageSuccess, (state, { allMessages }) => ({ ...state, lastMessage: allMessages.items[0] }))
);

export function reducer(state: State | undefined, action: Action) {
  return chatReducer(state, action);
}
