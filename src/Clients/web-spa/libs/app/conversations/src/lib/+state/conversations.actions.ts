import { HttpErrorResponse } from '@angular/common/http';

import { createAction, props } from '@ngrx/store';

import { ConversationsList } from '../shared/models/conversations-list.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserModel } from '../../../../users/src/lib/shared/models/user.model';
import { Conversation } from '../shared/models/conversation.model';

export const getAll = createAction(
  '[Conversations/API] Get All',
  props<{ currentUser: UserModel }>()
);

export const getAllSuccess = createAction(
  '[Conversations/API] Get All Success',
  props<{ conversations: ConversationsList }>()
);

export const getAllFailure = createAction(
  '[Conversations/API] Get All Failure',
  props<{ error: HttpErrorResponse }>()
);

export const create = createAction(
  '[Conversations/API] Create',
  props<{ conversation: Conversation }>()
);
export const createSuccess = createAction('[Conversations/API] Create Success');
export const createFailure = createAction(
  '[Conversations/API] Create Failure',
  props<{ error: HttpErrorResponse }>()
);
