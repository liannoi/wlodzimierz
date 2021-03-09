import { HttpErrorResponse } from '@angular/common/http';

import { createAction, props } from '@ngrx/store';

import { ConversationsList } from '../shared/models/conversations-list.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserModel } from '../../../../../shared/storage/src/lib/users/models/user.model';

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
