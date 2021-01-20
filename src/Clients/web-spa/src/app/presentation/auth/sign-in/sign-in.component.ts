import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {HttpErrorResponse} from '@angular/common/http';

import {AuthRoutingConstants} from '../auth-routing.constants';
import {UserModel} from '../../../domain/models/user.model';
import {SignInCommand} from '../../../application/storage/users/commands/sign-in.command';
import {UserSignInNotification} from '../../../application/storage/users/notifications/user-sign-in.notification';
import {JwtTokenModel} from '../../../domain/models/jwt-token.model';
import {unauthorizedValidator} from '../../../application/storage/users/validators/unauthorized.validator';
import {AuthFacadeImpl} from '../../../infrastructure/storage/users/auth.facade';
import {AuthFacade} from '../../../application/storage/users/auth.facade';
import {HomeRoutingConstants} from '../../home/home-routing.constants';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy, UserSignInNotification {

  public signInFormGroup!: FormGroup;
  public auth = AuthRoutingConstants;
  public haveFirstAttempt = false;

  private user: UserModel = new UserModel();

  constructor(@Inject(AuthFacadeImpl) private authFacade: AuthFacade, private router: Router, private title: Title) {
    title.setTitle('Sign in to Wlodzimierz - Wlodzimierz');
  }

  get username(): AbstractControl {
    return this.signInFormGroup.get('username') as AbstractControl;
  }

  get password(): AbstractControl {
    return this.signInFormGroup.get('password') as AbstractControl;
  }

  public ngOnInit(): void {
    this.setupForm();
  }

  public ngOnDestroy(): void {
    this.authFacade.onDispose();
  }

  public onSignIn(): void {
    if (this.signInFormGroup.invalid) {
      return;
    }

    this.user = this.signInFormGroup.getRawValue() as UserModel;
    this.authFacade.signIn(new SignInCommand(this.user), this);
  }

  public onSignInFailed(error: HttpErrorResponse): void {
    this.username?.setValue(this.user.username);
    this.password?.setValue('');
    this.haveFirstAttempt = true;
  }

  public onSignInSuccess(token: JwtTokenModel): void {
    this.writeToken(token);
    this.router.navigate([HomeRoutingConstants.Root]);
  }

  private setupForm(): void {
    this.signInFormGroup = new FormGroup({
      username: new FormControl(this.user.username, [Validators.required]),
      password: new FormControl(this.user.password, [Validators.required]),
      shouldRemember: new FormControl(this.user.shouldRemember),
    }, {validators: unauthorizedValidator});
  }

  // tslint:disable-next-line:typedef
  private writeToken(token: JwtTokenModel) {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    this.authFacade.writeToken(token, this.user.shouldRemember ? date : undefined);
  }
}
