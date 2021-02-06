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

export const authAdapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: State = authAdapter.getInitialState({
  currentUser: defaultUser(),
  loaded: false
});

const authReducer = createReducer(
  initialState,
  on(AuthActions.verifySuccess, (state, { user }) => ({ ...state, currentUser: user })),
  on(AuthActions.verifyFailure, state => ({ ...state, currentUser: initialState.currentUser }))
);

export function reducer(state: State | undefined, action: Action): State {
  return authReducer(state, action);
}
