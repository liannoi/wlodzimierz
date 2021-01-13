import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

import {UserModel} from '../shared/models/user.model';
import {AuthenticationPaths} from '../shared/auth.constants';
import {AuthService} from '../shared/services/auth.service';
import {SignInCommand} from '../shared/commands/sign-in/sign-in.command';
import {OnSignIn} from '../shared/commands/sign-in/on-sign-in.interface';
import {JwtTokenModel} from '../shared/models/jwt-token.model';
import {ApplicationPaths} from '../../shared/app.constants';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy, OnSignIn {

  public signInFormGroup!: FormGroup;
  public authenticationPaths = AuthenticationPaths;

  private user: UserModel = new UserModel();

  constructor(private authService: AuthService, private router: Router, private titleService: Title) {
    titleService.setTitle('Sign in to Wlodzimierz - Wlodzimierz');
  }

  get username(): AbstractControl | null {
    return this.signInFormGroup.get('username');
  }

  get email(): AbstractControl | null {
    return this.signInFormGroup.get('email');
  }

  get password(): AbstractControl | null {
    return this.signInFormGroup.get('password');
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
    this.email?.setValue(this.user.email);
    this.password?.setValue('');
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
      username: new FormControl(this.user.username),
      email: new FormControl(this.user.email),
      password: new FormControl(this.user.password),
      shouldRemember: new FormControl(this.user.shouldRemember),
    });
  }

  private writeToken(token: JwtTokenModel) {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    this.authService.writeToken(token, this.user.shouldRemember ? date : undefined);
  }
}
