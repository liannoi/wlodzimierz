import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as AuthActions from './auth.actions';
import { defaultUser, User } from '../shared/models/user.model';

export const AUTH_FEATURE_KEY = 'auth';

export interface State extends EntityState<User> {
  currentUser: User;
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: State;
}

export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: State = userAdapter.getInitialState({
  currentUser: defaultUser(),
  loaded: false
});

const authReducer = createReducer(
  initialState,
  on(AuthActions.signInSuccess, (state, { token }) => ({ ...state, token })),
  on(AuthActions.signInFailure, () => ({ ...initialState })),
  on(AuthActions.signOutSuccess, () => ({ ...initialState })),
  on(AuthActions.verifySuccess, (state, { currentUser, token }) => ({ ...state, currentUser, token })),
  on(AuthActions.verifyFailure, () => ({ ...initialState })),
  on(AuthActions.signUpSuccess, (state, { token }) => ({ ...state, token })),
  on(AuthActions.signUpFailure, () => ({ ...initialState }))
);

export function reducer(state: State | undefined, action: Action): State {
  return authReducer(state, action);
}
