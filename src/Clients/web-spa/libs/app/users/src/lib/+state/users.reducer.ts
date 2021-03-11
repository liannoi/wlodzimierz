import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as UsersActions from './users.actions';
import { UserModel } from '../shared/models/user.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { defaultModel } from '../../../../../shared/storage/src/lib/common/defaults/model.default';
import { UsersList } from '../shared/models/users-list.model';

export const USERS_FEATURE_KEY = 'users';

export interface State extends EntityState<UserModel> {
  currentUser: UserModel;
  filterable: UsersList;
}

export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: State;
}

export const usersAdapter: EntityAdapter<UserModel> = createEntityAdapter<UserModel>();

export const initialState: State = usersAdapter.getInitialState({
  currentUser: defaultModel(),
  filterable: defaultModel(),
  loaded: false,
});

const usersReducer = createReducer(
  initialState,
  on(UsersActions.verifySuccess, (state, { currentUser }) => ({
    ...state,
    currentUser,
  })),
  on(UsersActions.verifyFailure, () => ({ ...initialState })),
  on(UsersActions.signInSuccess, (state) => ({ ...state })),
  on(UsersActions.signInFailure, () => ({ ...initialState })),
  on(UsersActions.signOutSuccess, () => ({ ...initialState })),
  on(UsersActions.signUpSuccess, (state) => ({ ...state })),
  on(UsersActions.signUpFailure, () => ({ ...initialState })),
  on(UsersActions.filterSuccess, (state, { filterable }) => ({
    ...state,
    filterable,
  })),
  on(UsersActions.filterFailure, () => ({ ...initialState }))
);

export function reducer(state: State | undefined, action: Action) {
  return usersReducer(state, action);
}
