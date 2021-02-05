import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as AuthActions from './auth.actions';
import { User } from '../shared/models/user.model';

export const AUTH_FEATURE_KEY = 'auth';

export interface State extends EntityState<User> {
  currentUser: User;
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: State;
}

export const authAdapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: State = authAdapter.getInitialState({
  loaded: false,
  currentUser: {
    userId: '',
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    photo: '',
    password: '',
    shouldRemember: false
  }
});

const authReducer = createReducer(
  initialState,
  on(AuthActions.verifySuccess, (state, { user }) => ({ ...state, currentUser: user })),
  on(AuthActions.verifyFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
