import { HttpErrorResponse } from '@angular/common/http';

import { createAction, props } from '@ngrx/store';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Conversation } from '../../../../conversations/src/lib/shared/models/conversation.model';
import { ConversationMessagesList } from '../shared/models/conversation-messages-list.model';
import { ConversationMessage } from '../shared/models/conversation-message.model';

export const getAll = createAction(
  '[Conversation Messages/API] Get All',
  props<{ conversation: Conversation }>()
);
export const getAllSuccess = createAction(
  '[Conversation Messages/API] Get All Success',
  props<{ messages: ConversationMessagesList }>()
);
export const getAllFailure = createAction(
  '[Conversation Messages/API] Get All Failure',
  props<{ error: HttpErrorResponse }>()
);

export const create = createAction(
  '[Conversation Messages/API] Create',
  props<{ message: ConversationMessage }>()
);
export const createSuccess = createAction(
  '[Conversation Messages/API] Create Success',
  props<{ conversation: Conversation }>()
);
export const createFailure = createAction(
  '[Conversation Messages/API] Create Failure',
  props<{ error: HttpErrorResponse }>()
);
