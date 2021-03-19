import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Store } from '@ngrx/store';

import * as NgrxErrorActions from './ngrx-error.actions';

@Injectable()
export class NgrxErrorFacade {
  public constructor(private store: Store) {
  }

  public throw500Error(error: HttpErrorResponse): void {
    this.store.dispatch(NgrxErrorActions.throw500Error({ error }));
  }
}
