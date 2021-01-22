import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AuthServiceImpl } from '@wlodzimierz/infrastructure/src/lib/storage/users/services/auth.service';
import { AuthFacadeImpl } from '@wlodzimierz/infrastructure/src/lib/storage/users/auth.facade';
import { JwtTokenServiceImpl } from '@wlodzimierz/infrastructure/src/lib/storage/users/services/jwt-token.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [AuthServiceImpl, JwtTokenServiceImpl, AuthFacadeImpl]
})
export class InfrastructureModule {
}
