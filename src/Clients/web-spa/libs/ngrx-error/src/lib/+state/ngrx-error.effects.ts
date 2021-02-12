import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map } from 'rxjs/operators';

import { go } from '@wlodzimierz/ngrx-router';

import * as NgrxErrorActions from './ngrx-error.actions';

@Injectable()
export class NgrxErrorEffects {
  error500$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NgrxErrorActions.throw500Error),
      map(() => go({ to: { path: ['/'] } }))
    )
  );

  public constructor(private actions$: Actions) {
  }
}
