import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromNgrxError from './+state/ngrx-error.reducer';
import { NgrxNgrxErrorEffects } from './+state/ngrx-error.effects';
import { NgrxNgrxErrorFacade } from './+state/ngrx-error.facade';
import { NgrxNgrxErrorInterceptorService } from './services/ngrx-error-interceptor.service';

@NgModule({
  imports: [
    StoreModule.forFeature(
      fromNgrxError.NGRX_ERROR_FEATURE_KEY,
      fromNgrxError.reducer
    ),
    EffectsModule.forFeature([NgrxNgrxErrorEffects]),
  ],
  providers: [
    NgrxNgrxErrorFacade,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NgrxNgrxErrorInterceptorService,
      multi: true,
    },
  ],
})
export class NgrxNgrxErrorModule {}
