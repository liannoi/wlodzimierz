import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';

import {UserModel} from '../shared/models/user.model';
import {AuthenticationPaths} from '../shared/auth.constants';
import {AuthService} from '../shared/services/auth.service';
import {SignInCommand} from '../shared/commands/sign-in/sign-in.command';
import {OnSignIn} from '../shared/commands/sign-in/on-sign-in.interface';
import {JwtTokenModel} from '../shared/models/jwt-token.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy, OnSignIn {

  public signInFormGroup!: FormGroup;
  public authenticationPaths = AuthenticationPaths;

  private user: UserModel = new UserModel();

  constructor(private authService: AuthService, private titleService: Title) {
    titleService.setTitle('Sign in to Wlodzimierz - Wlodzimierz');
  }

  ///////////////////////////////////////////////////////////////////////////
  // Event handlers
  ///////////////////////////////////////////////////////////////////////////

  get username() {
    return this.signInFormGroup.get('username');
  }

  get password() {
    return this.signInFormGroup.get('password');
  }

  public ngOnInit(): void {
    this.setupForm();
  }

  public ngOnDestroy(): void {
    this.authService.onDispose();
  }

  ///////////////////////////////////////////////////////////////////////////
  // Basic methods
  ///////////////////////////////////////////////////////////////////////////

  public onSignInSuccess(token: JwtTokenModel): void {
    this.authService.writeToken(token);
  }

  ///////////////////////////////////////////////////////////////////////////
  // Getters for the form
  ///////////////////////////////////////////////////////////////////////////

  public onSignInFailed(error: HttpErrorResponse): void {
    this.username?.setValue(this.user.username);
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
      password: new FormControl(this.user.password)
    });
  }
}
