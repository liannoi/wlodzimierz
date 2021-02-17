import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromNgrxError from './+state/ngrx-error.reducer';
import { NgrxErrorEffects } from './+state/ngrx-error.effects';
import { NgrxErrorFacade } from './+state/ngrx-error.facade';
import { NgrxErrorInterceptorService } from './services/ngrx-error-interceptor.service';

@NgModule({
  imports: [
    StoreModule.forFeature(
      fromNgrxError.NGRX_ERROR_FEATURE_KEY,
      fromNgrxError.reducer
    ),
    EffectsModule.forFeature([NgrxErrorEffects])
  ],
  providers: [NgrxErrorFacade, {
    provide: HTTP_INTERCEPTORS,
    useClass: NgrxErrorInterceptorService,
    multi: true
  }]
})
export class NgrxErrorModule {
}
