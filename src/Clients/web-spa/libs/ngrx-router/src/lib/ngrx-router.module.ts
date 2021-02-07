import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer } from '@ngrx/router-store';

import * as fromNgrxRouter from './+state/ngrx-router.reducer';
import { NgrxRouterEffects } from './+state/ngrx-router.effects';
import { CustomSerializer } from './+state/custom.serializer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromNgrxRouter.NGRX_ROUTER_FEATURE_KEY, fromNgrxRouter.reducer),
    EffectsModule.forFeature([NgrxRouterEffects])
  ],
  providers: [NgrxRouterEffects, { provide: RouterStateSerializer, useClass: CustomSerializer }]
})
export class NgrxRouterModule {
}
