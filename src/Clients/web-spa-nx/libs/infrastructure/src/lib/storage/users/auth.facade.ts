import { Inject, Injectable } from '@angular/core';

import { AuthFacade } from '@wlodzimierz/data/src/lib/storage/users/auth.facade';
import { AuthService } from '@wlodzimierz/data/src/lib/storage/users/services/auth.service';
import { AuthServiceImpl } from '@wlodzimierz/infrastructure/src/lib/storage/users/services/auth.service';
import { JwtTokenService } from '@wlodzimierz/data/src/lib/storage/users/services/jwt-token.service';
import { JwtTokenModel } from '@wlodzimierz/domain/src/lib/models/jwt-token.model';
import { JwtTokenServiceImpl } from '@wlodzimierz/infrastructure/src/lib/storage/users/services/jwt-token.service';
import { SignInCommand } from '@wlodzimierz/data/src/lib/storage/users/commands/sign-in.command';
import { UserSignInNotification } from '@wlodzimierz/data/src/lib/storage/users/notifications/user-sign-in.notification';
import { SignUpCommand } from '@wlodzimierz/data/src/lib/storage/users/commands/sign-up.command';
import { UserSignUpNotification } from '@wlodzimierz/data/src/lib/storage/users/notifications/user-sign-up.notification';
import { VerifyCommand } from '@wlodzimierz/data/src/lib/storage/users/commands/verify.command';
import { UserVerifyNotification } from '@wlodzimierz/data/src/lib/storage/users/notifications/user-verify.notification';

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

  public writeToken(token: JwtTokenModel, expires?: Date | undefined): void {
    this.jwtTokenService.write(token, expires);
  }

  public signIn(request: SignInCommand, notification: UserSignInNotification): void {
    this.authService.signIn(request, notification);
  }

  public signUp(request: SignUpCommand, notification: UserSignUpNotification): void {
    this.authService.signUp(request, notification);
  }

  public verify(request: VerifyCommand, notification: UserVerifyNotification): void {
    this.authService.verify(request, notification);
  }

  public onDispose(): void {
    this.authService.onDispose();
  }
}
