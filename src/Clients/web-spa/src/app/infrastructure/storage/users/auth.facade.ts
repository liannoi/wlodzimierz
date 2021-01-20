import {Inject, Injectable} from '@angular/core';

import {AuthFacade} from '../../../application/storage/users/auth.facade';
import {JwtTokenModel} from '../../../domain/models/jwt-token.model';
import {UserVerifyNotification} from '../../../application/storage/users/notifications/user-verify.notification';
import {VerifyCommand} from '../../../application/storage/users/commands/verify.command';
import {UserSignUpNotification} from '../../../application/storage/users/notifications/user-sign-up.notification';
import {SignUpCommand} from '../../../application/storage/users/commands/sign-up.command';
import {SignInCommand} from '../../../application/storage/users/commands/sign-in.command';
import {UserSignInNotification} from '../../../application/storage/users/notifications/user-sign-in.notification';
import {JwtTokenService} from '../../../application/storage/users/jwt-token.service';
import {AuthService} from '../../../application/storage/users/auth.service';
import {AuthServiceImpl} from './services/auth.service';
import {JwtTokenServiceImpl} from './services/jwt-token.service';

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
