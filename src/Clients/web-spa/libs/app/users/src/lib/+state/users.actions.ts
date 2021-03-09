import { HttpErrorResponse } from '@angular/common/http';

import { createAction, props } from '@ngrx/store';

import { UserModel } from '../../../../../shared/storage/src/lib/users/models/user.model';
import { JwtToken } from '../../../../../shared/storage/src/lib/users/models/jwt-token.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { RemoteResult } from '../../../../../shared/storage/src/lib/core/remote/errors/remote-result.model';
import { UsersList } from '../../../../../shared/storage/src/lib/users/models/users-list.model';

export const verify = createAction('[Auth/API] Verify');
export const verifySuccess = createAction(
  '[Auth/API] Verify Success',
  props<{ currentUser: UserModel; token: JwtToken }>()
);
export const verifyFailure = createAction(
  '[Auth/API] Verify Failure',
  props<{ error: HttpErrorResponse }>()
);

export const signIn = createAction(
  '[Auth/API] Sign In',
  props<{ currentUser: UserModel }>()
);
export const signInSuccess = createAction(
  '[Auth/API] Sign In Success',
  props<{ token: JwtToken; shouldRemember: boolean }>()
);
export const signInFailure = createAction(
  '[Auth/API] Sign In Failure',
  props<{ error: HttpErrorResponse }>()
);

export const signOut = createAction('[Auth/API] Sign Out');
export const signOutSuccess = createAction('[Auth/API] Sign Out Success');

export const signUp = createAction(
  '[Auth/API] Sign Up',
  props<{ currentUser: UserModel }>()
);
export const signUpSuccess = createAction(
  '[Auth/API] Sign Up Success',
  props<{ token: JwtToken }>()
);
export const signUpFailure = createAction(
  '[Auth/API] Sign Up Failure',
  props<{ error: RemoteResult }>()
);

export const filter = createAction(
  '[Users/API] Filter',
  props<{ user: UserModel }>()
);
export const filterSuccess = createAction(
  '[Users/API] Filter Success',
  props<{ filterable: UsersList }>()
);
export const filterFailure = createAction(
  '[Users/API] Filter Failure',
  props<{ error: HttpErrorResponse }>()
);
