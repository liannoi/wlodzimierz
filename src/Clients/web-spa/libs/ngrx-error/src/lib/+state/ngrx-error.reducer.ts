import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as NgrxErrorActions from './ngrx-error.actions';
import { NgrxError } from './ngrx-error.models';

export const NGRX_ERROR_FEATURE_KEY = 'ngrxError';

export interface State extends EntityState<NgrxError> {
  status: number;
  message: string;
}

export interface NgrxErrorPartialState {
  readonly [NGRX_ERROR_FEATURE_KEY]: State;
}

export const ngrxErrorAdapter: EntityAdapter<NgrxError> = createEntityAdapter<NgrxError>();

export const initialState: State = ngrxErrorAdapter.getInitialState({
  status: -1,
  message: '',
  loaded: false
});

const ngrxErrorReducer = createReducer(
  initialState,
  on(NgrxErrorActions.throw500Error, (state, action) => ({
    ...state,
    status: action.error.status,
    message: action.error.message
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return ngrxErrorReducer(state, action);
}
