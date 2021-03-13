import { HttpErrorResponse } from '@angular/common/http';

import { createAction, props } from '@ngrx/store';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserModel } from '../../../../users/src/lib/shared/models/user.model';
import { ContactsList } from '../shared/models/contacts-list.model';
import { Contact } from '../shared/models/contact.model';

export const getAll = createAction(
  '[Contacts/API] Get All',
  props<{ currentUser: UserModel }>()
);
export const getAllSuccess = createAction(
  '[Contacts/API] Get All Success',
  props<{ contacts: ContactsList }>()
);
export const getAllFailure = createAction(
  '[Contacts/API] Get All Failure',
  props<{ error: HttpErrorResponse }>()
);

export const create = createAction(
  '[Contacts/API] Create',
  props<{ contact: Contact }>()
);
export const createSuccess = createAction(
  '[Contacts/API] Create Success',
  props<{ ownerUser: UserModel }>()
);
export const createFailure = createAction(
  '[Contacts/API] Create Failure',
  props<{ error: HttpErrorResponse }>()
);

export const deleteAction = createAction(
  '[Contacts/API Delete',
  props<{ contact: Contact }>()
);
export const deleteActionSuccess = createAction(
  '[Contacts/API] Delete Success',
  props<{ contact: Contact }>()
);
export const deleteActionFailure = createAction(
  '[Contacts/API] Delete Failure',
  props<{ error: HttpErrorResponse }>()
);
