import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as AppcontactsFeature from './app/contacts.reducer';
import * as AppcontactsActions from './app/contacts.actions';

@Injectable()
export class AppcontactsEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppcontactsActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return AppcontactsActions.loadAppcontactsSuccess({ appcontacts: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return AppcontactsActions.loadAppcontactsFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
