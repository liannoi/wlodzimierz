import { HttpErrorResponse } from '@angular/common/http';

import { createAction, props } from '@ngrx/store';

import { User } from '../shared/models/user.model';
import { JwtToken } from '../shared/models/jwt-token.model';
import { RemoteResult } from '../../../../storage/src/lib/remote/models/remote-result.model';

export const verify = createAction('[Auth/API] Verify');
export const verifySuccess = createAction('[Auth/API] Verify Success', props<{ currentUser: User, token: JwtToken }>());
export const verifyFailure = createAction('[Auth/API] Verify Failure', props<{ error: HttpErrorResponse }>());

export const signIn = createAction('[Auth/API] Sign In', props<{ currentUser: User }>());
export const signInSuccess = createAction('[Auth/API] Sign In Success', props<{ token: JwtToken, shouldRemember: boolean }>());
export const signInFailure = createAction('[Auth/API] Sign In Failure', props<{ error: HttpErrorResponse }>());

export const signOut = createAction('[Auth/API] Sign Out');
export const signOutSuccess = createAction('[Auth/API] Sign Out Success');

export const signUp = createAction('[Auth/API] Sign Up', props<{ currentUser: User }>());
export const signUpSuccess = createAction('[Auth/API] Sign Up Success', props<{ token: JwtToken }>());
export const signUpFailure = createAction('[Auth/API] Sign Up Failure', props<{ error: RemoteResult }>());
