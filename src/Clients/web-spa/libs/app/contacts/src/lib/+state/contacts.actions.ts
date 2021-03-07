import { HttpErrorResponse } from '@angular/common/http';

import { createAction, props } from '@ngrx/store';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserModel } from '../../../../../shared/storage/src/lib/users/models/user.model';
import { ContactsList } from '../shared/models/contacts-list.model';

export const getAll = createAction('[Contacts/API] Get All', props<{ currentUser: UserModel }>());

export const getAllSuccess = createAction('[Contacts/API] Get All Success', props<{ contacts: ContactsList }>());

export const getAllFailure = createAction('[Contacts/API] Get All Failure', props<{ error: HttpErrorResponse }>());
