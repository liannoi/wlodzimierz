import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {ApplicationModule} from '../application/application.module';
import {AuthServiceImpl} from './storage/users/services/auth.service';
import {JwtTokenServiceImpl} from './storage/users/services/jwt-token.service';
import {AuthFacadeImpl} from './storage/users/auth.facade';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ApplicationModule
  ],
  providers: [
    AuthServiceImpl,
    JwtTokenServiceImpl,
    AuthFacadeImpl
  ]
})
export class InfrastructureModule {
}
