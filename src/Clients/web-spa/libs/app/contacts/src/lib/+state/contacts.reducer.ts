import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as AppcontactsActions from './app/contacts.actions';
import { AppcontactsEntity } from './app/contacts.models';

export const APP/CONTACTS_FEATURE_KEY = 'appcontacts';

export interface State extends EntityState<AppcontactsEntity> {
  selectedId ?: string | number;          // which Appcontacts record has been selected
  loaded      : boolean;                  // has the Appcontacts list been loaded
  error      ?: string | null;            // last known error (if any)
}

export interface AppcontactsPartialState {
  readonly [APP/CONTACTS_FEATURE_KEY]: State;
}

export const appcontactsAdapter: EntityAdapter<AppcontactsEntity> = createEntityAdapter<AppcontactsEntity>();

export const initialState: State = appcontactsAdapter.getInitialState({
  // set initial required properties
  loaded : false
});

const appcontactsReducer = createReducer(
  initialState,
  on(AppcontactsActions.init,
    state => ({ ...state, loaded: false, error: null })
  ),
  on(AppcontactsActions.loadAppcontactsSuccess,
    (state, { appcontacts }) => appcontactsAdapter.setAll(appcontacts, { ...state, loaded: true })
  ),
  on(AppcontactsActions.loadAppcontactsFailure,
    (state, { error }) => ({ ...state, error })
  ),
);

export function reducer(state: State | undefined, action: Action) {
  return appcontactsReducer(state, action);
}
