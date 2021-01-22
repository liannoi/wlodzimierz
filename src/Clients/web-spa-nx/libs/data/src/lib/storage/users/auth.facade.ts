import { JwtTokenModel } from '@wlodzimierz/domain/src/lib/models/jwt-token.model';
import { UserVerifyNotification } from '@wlodzimierz/data/src/lib/storage/users/notifications/user-verify.notification';
import { UserSignInNotification } from '@wlodzimierz/data/src/lib/storage/users/notifications/user-sign-in.notification';
import { SignInCommand } from '@wlodzimierz/data/src/lib/storage/users/commands/sign-in.command';
import { SignUpCommand } from '@wlodzimierz/data/src/lib/storage/users/commands/sign-up.command';
import { UserSignUpNotification } from '@wlodzimierz/data/src/lib/storage/users/notifications/user-sign-up.notification';
import { VerifyCommand } from '@wlodzimierz/data/src/lib/storage/users/commands/verify.command';
import { OnDispose } from '@wlodzimierz/data/src/lib/common/on-dispose.interface';

export interface AuthFacade extends OnDispose {

  signIn(request: SignInCommand, notification: UserSignInNotification): void;

  signUp(request: SignUpCommand, notification: UserSignUpNotification): void;

  verify(request: VerifyCommand, notification: UserVerifyNotification): void;

  writeToken(token: JwtTokenModel, expires: Date): void;

  readToken(): JwtTokenModel;

  checkToken(): boolean;

  clearToken(): void;
}
