import { createAction, props } from '@ngrx/store';
import { AppcontactsEntity } from './app/contacts.models';

export const init = createAction('[Appcontacts Page] Init');

export const loadAppcontactsSuccess = createAction(
  '[Appcontacts/API] Load Appcontacts Success',
  props<{ appcontacts: AppcontactsEntity[] }>()
);

export const loadAppcontactsFailure = createAction(
  '[Appcontacts/API] Load Appcontacts Failure',
  props<{ error: any }>()
);
