import { createAction, props } from '@ngrx/store';

import { Conversation } from '../conversations/shared/models/conversation.model';
import { ConversationMessagesList } from '../conversation-messages/shared/conversation-messages-list.model';

export const selectConversation = createAction('[Chat] Conversation selected', props<{ currentConversation: Conversation }>());

export const loadLastMessage = createAction('[Chat/API] Loading the last message', props<{ currentConversation: Conversation }>());
export const loadLastMessageSuccess = createAction('[Chat/API] Loading last message - successful', props<{ allMessages: ConversationMessagesList }>());
export const loadLastMessageFailure = createAction('[Chat/API] Loading last message - failure', props<{ error: never }>());
