import { HttpErrorResponse } from '@angular/common/http';

import { createAction, props } from '@ngrx/store';

import { User } from '../shared/models/user.model';

export const verifySuccess = createAction('[Auth/API] Verify Success', props<{ user: User }>());
export const verifyFailure = createAction('[Auth/API] Verify Failure', props<{ error: HttpErrorResponse }>());
