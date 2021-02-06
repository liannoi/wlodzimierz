import { HttpErrorResponse } from '@angular/common/http';

import { createAction, props } from '@ngrx/store';

import { User } from '../shared/models/user.model';
import { JwtToken } from '../shared/models/jwt-token.model';

export const verify = createAction('[Auth/API] Verify', props<{ token: JwtToken }>());
export const verifySuccess = createAction('[Auth/API] Verify Success', props<{ user: User }>());
export const verifyFailure = createAction('[Auth/API] Verify Failure', props<{ error: HttpErrorResponse }>());

export const signIn = createAction('[Auth/API] Sign In', props<{ user: User }>());
export const signInSuccess = createAction('[Auth/API] Sign In Success', props<{ token: JwtToken }>());
export const signInFailure = createAction('[Auth/API] Sign In Failure', props<{ error: HttpErrorResponse }>());
