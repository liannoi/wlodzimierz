import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as ContactsActions from './contacts.actions';
import { UsersService } from '../../../../../shared/storage/src/lib/remote/users.service';

@Injectable()
export class ContactsEffects {
  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactsActions.getAll),
      concatMap((action) =>
        this.usersService.getContacts(action.currentUser).pipe(
          map((response) => ContactsActions.getAllSuccess({ contacts: response })),
          catchError((error) => of(ContactsActions.getAllFailure(error)))
        )
      )
    )
  );

  public constructor(private actions$: Actions, private usersService: UsersService) {
  }
}
