import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

import {UserModel} from '../core/models/user.model';
import {AuthenticationPaths} from '../shared/auth.constants';
import {AuthService} from '../core/auth.service';
import {SignInCommand} from '../core/commands/sign-in/sign-in.command';
import {OnSignInHandler} from '../core/commands/sign-in/on-sign-in.handler';
import {JwtTokenModel} from '../core/models/jwt-token.model';
import {ApplicationPaths} from '../../shared/app.constants';
import {unauthorizedValidator} from '../core/validators/unauthorized.validator';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy, OnSignInHandler {

  public signInFormGroup!: FormGroup;
  public authenticationPaths = AuthenticationPaths;
  public haveFirstAttempt = false;

  private user: UserModel = new UserModel();

  constructor(private authService: AuthService, private router: Router, private titleService: Title) {
    titleService.setTitle('Sign in to Wlodzimierz - Wlodzimierz');
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
    this.authService.onDispose();
  }

  public onSignInSuccess(token: JwtTokenModel): void {
    this.writeToken(token);
    this.router.navigate([ApplicationPaths.Home]);
  }

  public onSignInFailed(error: HttpErrorResponse): void {
    this.username?.setValue(this.user.username);
    this.password?.setValue('');
    this.haveFirstAttempt = true;
  }

  public onSignIn(): void {
    if (this.signInFormGroup.invalid) {
      return;
    }

    this.user = this.signInFormGroup.getRawValue() as UserModel;
    this.authService.signIn(new SignInCommand(this.user), this);
  }

  ///////////////////////////////////////////////////////////////////////////
  // Helpers
  ///////////////////////////////////////////////////////////////////////////

  private setupForm(): void {
    this.signInFormGroup = new FormGroup({
      username: new FormControl(this.user.username, [Validators.required]),
      password: new FormControl(this.user.password, [Validators.required]),
      shouldRemember: new FormControl(this.user.shouldRemember),
    }, {validators: unauthorizedValidator});
  }

  private writeToken(token: JwtTokenModel) {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    this.authService.writeToken(token, this.user.shouldRemember ? date : undefined);
  }
}
