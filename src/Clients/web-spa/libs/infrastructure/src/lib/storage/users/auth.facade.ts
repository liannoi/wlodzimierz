import { Inject, Injectable } from '@angular/core';

import { AuthFacade } from '@wlodzimierz/application/src/lib/storage/users/auth.facade';
import { AuthService } from '@wlodzimierz/application/src/lib/storage/users/services/auth.service';
import { AuthServiceImpl } from '@wlodzimierz/infrastructure/src/lib/storage/users/services/auth.service';
import { JwtTokenModel } from '@wlodzimierz/domain/src/lib/models/jwt-token.model';
import { JwtTokenServiceImpl } from '@wlodzimierz/infrastructure/src/lib/storage/users/cookies/jwt-token.service';
import { SignInCommand } from '@wlodzimierz/application/src/lib/storage/users/commands/sign-in.command';
import { SignInNotification } from '@wlodzimierz/domain/src/lib/notifications/users/sign-in.notification';
import { SignUpCommand } from '@wlodzimierz/application/src/lib/storage/users/commands/sign-up.command';
import { SignUpNotification } from '@wlodzimierz/domain/src/lib/notifications/users/sign-up.notification';
import { VerifyCommand } from '@wlodzimierz/application/src/lib/storage/users/commands/verify.command';
import { VerifyNotification } from '@wlodzimierz/domain/src/lib/notifications/users/verify.notification';
import { Cookie } from '@wlodzimierz/application/src/lib/common/interfaces/cookie.interface';

@Injectable()
export class AuthFacadeImpl implements AuthFacade {
  public constructor(
    @Inject(AuthServiceImpl) private authService: AuthService,
    @Inject(JwtTokenServiceImpl) private jwtTokenService: Cookie<JwtTokenModel>
  ) {
  }

  public checkToken(): boolean {
    return this.jwtTokenService.check();
  }

  public clearToken(): void {
    this.jwtTokenService.clear();
  }

  public readToken(): JwtTokenModel {
    return this.jwtTokenService.read();
  }

  public writeToken(token: JwtTokenModel, expires: Date): void {
    this.jwtTokenService.write(token.value, expires);
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
