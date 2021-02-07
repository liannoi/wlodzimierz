import { Injectable } from '@angular/core';

import { map, tap } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as NgrxRouterActions from './ngrx-router.actions';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable()
export class NgrxRouterEffects {
  navigate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NgrxRouterActions.go),
        map(action => action.to),
        tap(({ path, query: queryParams, extras }) => this.router.navigate(path, { queryParams, ...extras }))
      ),
    { dispatch: false }
  );

  navigateBack$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NgrxRouterActions.back),
        tap(() => this.location.back())
      ),
    { dispatch: false }
  );

  navigationForward$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NgrxRouterActions.forward),
        tap(() => this.location.forward())
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private router: Router, private location: Location) {
  }
}
