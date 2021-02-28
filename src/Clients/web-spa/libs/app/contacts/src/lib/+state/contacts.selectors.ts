import { createFeatureSelector, createSelector } from '@ngrx/store';
import { APP/CONTACTS_FEATURE_KEY, State, AppcontactsPartialState, appcontactsAdapter } from './app/contacts.reducer';

// Lookup the 'Appcontacts' feature state managed by NgRx
export const getAppcontactsState = createFeatureSelector<AppcontactsPartialState, State>(APP/CONTACTS_FEATURE_KEY);

const { selectAll, selectEntities } = appcontactsAdapter.getSelectors();

export const getAppcontactsLoaded = createSelector(
  getAppcontactsState,
  (state: State) => state.loaded
);

export const getAppcontactsError = createSelector(
  getAppcontactsState,
  (state: State) => state.error
);

export const getAllAppcontacts = createSelector(
  getAppcontactsState,
  (state: State) => selectAll(state)
);

export const getAppcontactsEntities = createSelector(
  getAppcontactsState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getAppcontactsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getAppcontactsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
