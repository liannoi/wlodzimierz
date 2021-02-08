import { HttpErrorResponse } from '@angular/common/http';

import { createAction, props } from '@ngrx/store';

import { User } from '../shared/models/user.model';
import { JwtToken } from '../shared/models/jwt-token.model';

export const verify = createAction('[Auth/API] Verify');
export const verifySuccess = createAction('[Auth/API] Verify Success', props<{ currentUser: User, token: JwtToken }>());
export const verifyFailure = createAction('[Auth/API] Verify Failure', props<{ error: HttpErrorResponse }>());

export const signIn = createAction('[Auth/API] Sign In', props<{ user: User }>());
export const signInSuccess = createAction('[Auth/API] Sign In Success', props<{ token: JwtToken, shouldRemember: boolean }>());
export const signInFailure = createAction('[Auth/API] Sign In Failure', props<{ error: HttpErrorResponse }>());
