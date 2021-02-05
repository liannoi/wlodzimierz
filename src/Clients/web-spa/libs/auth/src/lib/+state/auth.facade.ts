import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

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

  public verifySuccess(user: User) {
    this.store.dispatch(AuthActions.verifySuccess({ user }));
  }

  public verifyFailure(error: HttpErrorResponse) {
    this.store.dispatch(AuthActions.verifyFailure({ error }));
  }
}

/*
import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';



import * as AuthActions from './auth.actions';
import * as AuthFeature from './auth.reducer';
import * as AuthSelectors from './auth.selectors';

@Injectable()
export class AuthFacade {
  /!**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   *!/
  loaded$ = this.store.pipe(select(AuthSelectors.getAuthLoaded));
  allAuth$ = this.store.pipe(select(AuthSelectors.getAllAuth));
  selectedAuth$ = this.store.pipe(select(AuthSelectors.getSelected));

  constructor(private store: Store) {}

  /!**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   *!/
  init() {
    this.store.dispatch(AuthActions.init());
  }
}
*/
