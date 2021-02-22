import { Injectable } from '@angular/core';

import { Actions } from '@ngrx/effects';

@Injectable()
export class NgrxErrorEffects {
  public constructor(private actions$: Actions) {
  }
}
