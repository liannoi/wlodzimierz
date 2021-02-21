import { createAction, props } from '@ngrx/store';

import { Route } from './ngrx-router.models';

export const go = createAction('[Router] Go', props<{ to: Route }>());
export const back = createAction('[Router] Back');
export const forward = createAction('[Router] Forward');
