import { Inject, Injectable } from '@angular/core';

import { AuthFacade } from '@wlodzimierz/application/src/lib/storage/users/auth.facade';
import { AuthService } from '@wlodzimierz/application/src/lib/storage/users/services/auth.service';
import { AuthServiceImpl } from '@wlodzimierz/infrastructure/src/lib/storage/users/core/auth.service';
import { JwtTokenService } from '@wlodzimierz/application/src/lib/storage/users/services/jwt-token.service';
import { JwtTokenModel } from '@wlodzimierz/domain/src/lib/models/jwt-token.model';
import { JwtTokenServiceImpl } from '@wlodzimierz/infrastructure/src/lib/storage/users/core/jwt-token.service';
import { SignInCommand } from '@wlodzimierz/application/src/lib/storage/users/commands/sign-in.command';
import { SignInNotification } from '@wlodzimierz/application/src/lib/storage/users/notifications/sign-in.notification';
import { SignUpCommand } from '@wlodzimierz/application/src/lib/storage/users/commands/sign-up.command';
import { SignUpNotification } from '@wlodzimierz/application/src/lib/storage/users/notifications/sign-up.notification';
import { VerifyCommand } from '@wlodzimierz/application/src/lib/storage/users/commands/verify.command';
import { VerifyNotification } from '@wlodzimierz/application/src/lib/storage/users/notifications/verify.notification';

@Injectable()
export class AuthFacadeImpl implements AuthFacade {

  public constructor(
    @Inject(AuthServiceImpl) private authService: AuthService,
    @Inject(JwtTokenServiceImpl) private jwtTokenService: JwtTokenService) {
  }

  public checkToken(): boolean {
    return this.jwtTokenService.check();
  }

  public clearToken(): void {
    return this.jwtTokenService.clear();
  }

  public readToken(): JwtTokenModel {
    return this.jwtTokenService.read();
  }

  public writeToken(token: JwtTokenModel, expires?: Date): void {
    this.jwtTokenService.write(token, expires);
  }

  public signIn(request: SignInCommand, notification: SignInNotification): void {
    this.authService.signIn(request, notification);
  }

  public signUp(request: SignUpCommand, notification: SignUpNotification): void {
    this.authService.signUp(request, notification);
  }

  public verify(request: VerifyCommand, notification: VerifyNotification): void {
    this.authService.verify(request, notification);
  }

  public onDispose(): void {
    this.authService.onDispose();
  }
}
