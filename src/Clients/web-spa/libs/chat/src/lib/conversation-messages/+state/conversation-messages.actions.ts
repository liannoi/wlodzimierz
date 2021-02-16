import { HttpErrorResponse } from '@angular/common/http';

import { createAction, props } from '@ngrx/store';

import { Conversation } from '../../conversations/shared/models/conversation.model';
import { ConversationMessagesList } from '../shared/models/conversation-messages-list.model';

export const getAll = createAction('[Conversation Messages/API] Get All', props<{ conversation: Conversation }>());
export const getAllSuccess = createAction('[Conversation Messages/API] Get All Success', props<{ messages: ConversationMessagesList }>());
export const getAllFailure = createAction('[Conversation Messages/API] Get All Failure', props<{ error: HttpErrorResponse }>());
