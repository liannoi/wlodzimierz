import { JwtTokenModel } from '@wlodzimierz/domain/src/lib/models/jwt-token.model';
import { VerifyNotification } from '@wlodzimierz/domain/src/lib/notifications/users/verify.notification';
import { SignInNotification } from '@wlodzimierz/domain/src/lib/notifications/users/sign-in.notification';
import { SignInCommand } from '@wlodzimierz/application/src/lib/storage/users/commands/sign-in.command';
import { SignUpCommand } from '@wlodzimierz/application/src/lib/storage/users/commands/sign-up.command';
import { SignUpNotification } from '@wlodzimierz/domain/src/lib/notifications/users/sign-up.notification';
import { VerifyCommand } from '@wlodzimierz/application/src/lib/storage/users/commands/verify.command';
import { OnDispose } from '@wlodzimierz/application/src/lib/common/interfaces/dispose.interface';

export interface AuthFacade extends OnDispose {
  signIn(request: SignInCommand, notification: SignInNotification): void;

  signUp(request: SignUpCommand, notification: SignUpNotification): void;

  verify(request: VerifyCommand, notification: VerifyNotification): void;

  writeToken(token: JwtTokenModel, expires: Date): void;

  readToken(): JwtTokenModel;

  checkToken(): boolean;

  clearToken(): void;
}
