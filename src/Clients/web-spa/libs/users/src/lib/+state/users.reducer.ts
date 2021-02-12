import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as UsersActions from './users.actions';
import { User } from '../shared/models/user.model';
import { defaultModel } from '../../../../storage/src/lib/defaults/model.default';

export const USERS_FEATURE_KEY = 'users';

export interface State extends EntityState<User> {
  currentUser: User;
}

export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: State;
}

export const usersAdapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: State = usersAdapter.getInitialState({
  currentUser: defaultModel(),
  loaded: false
});

const usersReducer = createReducer(
  initialState,
  on(UsersActions.verifySuccess, (state, { currentUser }) => ({ ...state, currentUser })),
  on(UsersActions.verifyFailure, () => ({ ...initialState }))
);

export function reducer(state: State | undefined, action: Action) {
  return usersReducer(state, action);
}
