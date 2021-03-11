import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { of } from 'rxjs';
import { catchError, concatMap, map, tap } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as ContactsActions from './contacts.actions';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UsersService } from '../../../../users/src/lib/shared/storage/services/users.service';
import { ContactsService } from '../shared/storage/contacts.service';
import { ContactsFacade } from './contacts.facade';

@Injectable()
export class ContactsEffects {
  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactsActions.getAll),
      concatMap((action) =>
        this.usersService.getContacts(action.currentUser).pipe(
          map((response) =>
            ContactsActions.getAllSuccess({ contacts: response })
          ),
          catchError((error) => of(ContactsActions.getAllFailure(error)))
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactsActions.create),
      concatMap((action) =>
        this.contactsService.create(action.contact).pipe(
          map(() =>
            ContactsActions.createSuccess({
              ownerUser: action.contact.ownerUser,
            })
          ),
          catchError((error) => of(ContactsActions.createFailure(error)))
        )
      )
    )
  );

  createSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ContactsActions.createSuccess),
        tap((action) => this.contactsFacade.getAll(action.ownerUser))
      ),
    { dispatch: false }
  );

  public constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private contactsService: ContactsService,
    private contactsFacade: ContactsFacade,
    private router: Router
  ) {}
}
