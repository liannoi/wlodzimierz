import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Contact } from '../shared/models/contact.model';
import { ContactsList } from '../shared/models/contacts-list.model';
import { defaultModel } from '../../../../../shared/storage/src/lib/common/defaults/model.default';
import * as ContactsActions from './contacts.actions';

export const CONTACTS_FEATURE_KEY = 'contacts';

export interface State extends EntityState<Contact> {
  contacts: ContactsList
}

export interface ContactsPartialState {
  readonly [CONTACTS_FEATURE_KEY]: State;
}

export const contactsAdapter: EntityAdapter<Contact> = createEntityAdapter<Contact>();

export const initialState: State = contactsAdapter.getInitialState({
  contacts: defaultModel(),
  loaded: false
});

const contactsReducer = createReducer(
  initialState,
  on(ContactsActions.getAllSuccess, (state, { contacts }) => ({ ...state, contacts })),
  on(ContactsActions.getAllFailure, () => ({ ...initialState }))
);

export function reducer(state: State | undefined, action: Action) {
  return contactsReducer(state, action);
}
