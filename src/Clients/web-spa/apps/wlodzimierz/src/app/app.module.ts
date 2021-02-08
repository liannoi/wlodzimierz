import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { NgrxRouterModule } from '@wlodzimierz/ngrx-router';

import { AppComponent } from './app.component';
import { TopMenuComponent } from './layout/top-menu/top-menu.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AuthModule } from '../../../../libs/auth/src/lib/auth.module';

@NgModule({
  imports: [
    BrowserModule,
    NgbModule,
    AuthModule,
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
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  declarations: [AppComponent, TopMenuComponent, FooterComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
