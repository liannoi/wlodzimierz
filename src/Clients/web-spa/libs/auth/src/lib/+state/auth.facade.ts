import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { select, Store } from '@ngrx/store';

import { User } from '../shared/models/user.model';
import * as AuthSelectors from './auth.selectors';
import * as AuthActions from './auth.actions';
import { JwtToken } from '../shared/models/jwt-token.model';

@Injectable()
export class AuthFacade {
  public currentUser$: Observable<User> = this.store.pipe(select(AuthSelectors.getCurrentUser));

  public constructor(private store: Store) {
  }

  public verify(token: JwtToken) {
    this.store.dispatch(AuthActions.verify({ token }));
  }

  public signIn(user: User) {
    this.store.dispatch(AuthActions.signIn({ user }));
  }
}
