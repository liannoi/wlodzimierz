import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  CONTACTS_FEATURE_KEY,
  ContactsPartialState,
  State
} from './contacts.reducer';

const getContactsState = createFeatureSelector<ContactsPartialState, State>(
  CONTACTS_FEATURE_KEY
);

export const getContacts = createSelector(
  getContactsState,
  (state: State) => state.contacts
);
