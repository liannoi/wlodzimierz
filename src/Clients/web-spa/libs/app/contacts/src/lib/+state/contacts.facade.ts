import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { select, Store } from '@ngrx/store';

import * as ContactsActions from './contacts.actions';
import * as ContactsSelectors from './contacts.selectors';
import { ContactsList } from '../shared/models/contacts-list.model';
import { UserModel } from '../../../../users/src/lib/shared/models/user.model';

@Injectable()
export class ContactsFacade {
  public contacts$: Observable<ContactsList> = this.store.pipe(select(ContactsSelectors.getContacts));

  public constructor(private store: Store) {
  }

  public getAll(currentUser: UserModel): void {
    this.store.dispatch(ContactsActions.getAll({ currentUser }));
  }
}
