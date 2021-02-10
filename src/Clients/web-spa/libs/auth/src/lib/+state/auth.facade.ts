import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { select, Store } from '@ngrx/store';

import { User } from '../shared/models/user.model';
import * as AuthSelectors from './auth.selectors';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthFacade {
  public currentUser$: Observable<User> = this.store.pipe(select(AuthSelectors.getCurrentUser));

  public constructor(private store: Store) {
  }

  public signIn(user: User) {
    this.store.dispatch(AuthActions.signIn({ user }));
  }

  public signUp(user: User) {
    this.store.dispatch(AuthActions.signUp({ user }));
  }

  public signOut() {
    this.store.dispatch(AuthActions.signOut());
  }

  public verify() {
    this.store.dispatch(AuthActions.verify());
  }
}
