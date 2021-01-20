import {SignInCommand} from './commands/sign-in.command';
import {UserSignInNotification} from './notifications/user-sign-in.notification';
import {SignUpCommand} from './commands/sign-up.command';
import {UserSignUpNotification} from './notifications/user-sign-up.notification';
import {VerifyCommand} from './commands/verify.command';
import {UserVerifyNotification} from './notifications/user-verify.notification';
import {JwtTokenModel} from '../../../domain/models/jwt-token.model';
import {OnDispose} from '../../common/on-dispose.interface';

export interface AuthFacade extends OnDispose {

  signIn(request: SignInCommand, notification: UserSignInNotification): void;

  signUp(request: SignUpCommand, notification: UserSignUpNotification): void;

  verify(request: VerifyCommand, notification: UserVerifyNotification): void;

  // @ts-ignore
  writeToken(token: JwtTokenModel, expires: Date | undefined = undefined): void;

  readToken(): JwtTokenModel;

  checkToken(): boolean;

  clearToken(): void;
}
