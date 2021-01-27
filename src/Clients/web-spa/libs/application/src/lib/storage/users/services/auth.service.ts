import { SignInCommand } from '@wlodzimierz/application/src/lib/storage/users/commands/sign-in.command';
import { SignInNotification } from '@wlodzimierz/domain/src/lib/notifications/users/sign-in.notification';
import { SignUpCommand } from '@wlodzimierz/application/src/lib/storage/users/commands/sign-up.command';
import { SignUpNotification } from '@wlodzimierz/domain/src/lib/notifications/users/sign-up.notification';
import { VerifyCommand } from '@wlodzimierz/application/src/lib/storage/users/commands/verify.command';
import { VerifyNotification } from '@wlodzimierz/domain/src/lib/notifications/users/verify.notification';
import { OnDispose } from '@wlodzimierz/application/src/lib/common/interfaces/dispose.interface';

export interface AuthService extends OnDispose {
  signIn(request: SignInCommand, notification: SignInNotification): void;

  signUp(request: SignUpCommand, notification: SignUpNotification): void;

  verify(request: VerifyCommand, notification: VerifyNotification): void;
}
