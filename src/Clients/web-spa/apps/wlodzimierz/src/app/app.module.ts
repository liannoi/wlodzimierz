import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UsersModule } from '@wlodzimierz/app/users';
import { NgrxErrorModule } from '@wlodzimierz/ngrx/ngrx-error';
import { NgrxRouterModule } from '@wlodzimierz/ngrx/ngrx-router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TopMenuComponent } from './layout/top-menu/top-menu.component';
import { FooterComponent } from './layout/footer/footer.component';
import { environment } from '../environments/environment';

export const APP_CONFIG = new InjectionToken('Application config');

@NgModule({
  imports: [
    BrowserModule,
    NgbModule,
    UsersModule,
    AppRoutingModule,
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true
        }
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    NgrxRouterModule,
    NgrxErrorModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  declarations: [AppComponent, FooterComponent, TopMenuComponent],
  bootstrap: [AppComponent],
  providers: [{ provide: APP_CONFIG, useValue: environment }]
})
export class AppModule {
}
