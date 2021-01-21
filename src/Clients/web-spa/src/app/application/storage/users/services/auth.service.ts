import {SignInCommand} from '../commands/sign-in.command';
import {UserSignInNotification} from '../notifications/user-sign-in.notification';
import {OnDispose} from '../../../common/on-dispose.interface';
import {SignUpCommand} from '../commands/sign-up.command';
import {UserSignUpNotification} from '../notifications/user-sign-up.notification';
import {VerifyCommand} from '../commands/verify.command';
import {UserVerifyNotification} from '../notifications/user-verify.notification';

export interface AuthService extends OnDispose {

  signIn(request: SignInCommand, notification: UserSignInNotification): void;

  signUp(request: SignUpCommand, notification: UserSignUpNotification): void;

  verify(request: VerifyCommand, notification: UserVerifyNotification): void;
}
