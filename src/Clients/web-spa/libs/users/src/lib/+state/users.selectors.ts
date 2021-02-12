import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State, USERS_FEATURE_KEY, UsersPartialState } from './users.reducer';

const getUsersState = createFeatureSelector<UsersPartialState, State>(USERS_FEATURE_KEY);

export const getCurrentUser = createSelector(getUsersState, (state: State) => state.currentUser);
