import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as UsersActions from './users.actions';
import * as UsersSelectors from './users.selectors';
import { User } from '../shared/models/user.model';

@Injectable()
export class UsersFacade {
  public currentUser$: Observable<User> = this.store.pipe(select(UsersSelectors.getCurrentUser));

  public constructor(private store: Store) {
  }

  public verify() {
    this.store.dispatch(UsersActions.verify());
  }
}
