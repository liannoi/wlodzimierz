import { HttpErrorResponse } from '@angular/common/http';

import { createAction, props } from '@ngrx/store';

export const throw500Error = createAction(
  '[NgRx/Error] THROW_500_ERROR',
  props<{ error: HttpErrorResponse }>()
);
