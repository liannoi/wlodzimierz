import { SignInCommand } from '@wlodzimierz/application/src/lib/storage/users/commands/sign-in.command';
import { UserSignInNotification } from '@wlodzimierz/application/src/lib/storage/users/notifications/user-sign-in.notification';
import { SignUpCommand } from '@wlodzimierz/application/src/lib/storage/users/commands/sign-up.command';
import { UserSignUpNotification } from '@wlodzimierz/application/src/lib/storage/users/notifications/user-sign-up.notification';
import { VerifyCommand } from '@wlodzimierz/application/src/lib/storage/users/commands/verify.command';
import { UserVerifyNotification } from '@wlodzimierz/application/src/lib/storage/users/notifications/user-verify.notification';
import { OnDispose } from '@wlodzimierz/application/src/lib/common/on-dispose.interface';

export interface AuthService extends OnDispose {

  signIn(request: SignInCommand, notification: UserSignInNotification): void;

  signUp(request: SignUpCommand, notification: UserSignUpNotification): void;

  verify(request: VerifyCommand, notification: UserVerifyNotification): void;
}
