import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_FEATURE_KEY, AuthPartialState, State } from './auth.reducer';

export const getAuthState = createFeatureSelector<AuthPartialState, State>(AUTH_FEATURE_KEY);

export const getCurrentUser = createSelector(getAuthState, (state: State) => state.currentUser);
