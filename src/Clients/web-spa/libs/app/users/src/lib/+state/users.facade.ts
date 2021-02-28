import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as UsersActions from './users.actions';
import * as UsersSelectors from './users.selectors';
import { UserModel } from '../shared/models/user.model';

@Injectable()
export class UsersFacade {
  public currentUser$: Observable<UserModel> = this.store.pipe(
    select(UsersSelectors.getCurrentUser)
  );

  public constructor(private store: Store) {
  }

  public verify(): void {
    this.store.dispatch(UsersActions.verify());
  }

  public signIn(currentUser: UserModel): void {
    this.store.dispatch(UsersActions.signIn({ currentUser }));
  }

  public signOut(): void {
    this.store.dispatch(UsersActions.signOut());
  }

  public signUp(currentUser: UserModel): void {
    this.store.dispatch(UsersActions.signUp({ currentUser }));
  }
}
