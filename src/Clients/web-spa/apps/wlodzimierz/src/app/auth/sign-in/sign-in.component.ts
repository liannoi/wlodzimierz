import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';
import { AbstractControl, FormControl, Validators } from '@angular/forms';

import { JwtTokenModel } from '@wlodzimierz/domain/src/lib/models/jwt-token.model';
import { unauthorizedValidator } from '@wlodzimierz/application/src/lib/storage/users/validators/unauthorized.validator';
import { UserModel } from '@wlodzimierz/domain/src/lib/models/user.model';
import { AuthFacadeImpl } from '@wlodzimierz/infrastructure/src/lib/storage/users/services/auth.facade';
import { AuthFacade } from '@wlodzimierz/application/src/lib/storage/users/services/auth.facade';
import { SignInNotification } from '@wlodzimierz/domain/src/lib/notifications/users/sign-in.notification';
import { SignInCommand } from '@wlodzimierz/application/src/lib/storage/users/commands/sign-in.command';

import { HomeRouting } from '../../home/home.routing';
import { AuthRouting } from '../auth.routing';
import { AuthFormGroup } from '../shared/auth-form-group.class';

@Component({
  selector: 'wlodzimierz-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy, SignInNotification {
  public routing = AuthRouting;
  public group: AuthFormGroup;
  private currentUser: UserModel = new UserModel();

  public constructor(
    @Inject(AuthFacadeImpl) private authFacade: AuthFacade,
    private router: Router,
    private titleService: Title
  ) {
    titleService.setTitle('Sign in to Wlodzimierz - Wlodzimierz');
  }

  ///////////////////////////////////////////////////////////////////////////
  // Form controls
  ///////////////////////////////////////////////////////////////////////////

  public get userName(): AbstractControl {
    return this.group.get('userName') as AbstractControl;
  }

  public get password(): AbstractControl {
    return this.group.get('password') as AbstractControl;
  }

  ///////////////////////////////////////////////////////////////////////////
  // Interface handlers
  ///////////////////////////////////////////////////////////////////////////

  public ngOnInit(): void {
    this.setupForm();
  }

  public ngOnDestroy(): void {
    this.authFacade.onDispose();
  }

  public onSignIn(): void {
    if (this.group.invalid) {
      return;
    }

    this.currentUser = this.group.getRawValue() as UserModel;
    this.authFacade.signIn(new SignInCommand(this.currentUser), this);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public onSignInFailed(error: HttpErrorResponse): void {
    this.userName.setValue(this.currentUser.userName);
    this.password.setValue('');
    this.group.failed();
  }

  public onSignInSuccess(token: JwtTokenModel): void {
    this.writeToken(token);
    this.router.navigate([HomeRouting.Root]);
  }

  ///////////////////////////////////////////////////////////////////////////
  // Helpers
  ///////////////////////////////////////////////////////////////////////////

  private setupForm(): void {
    this.group = new AuthFormGroup(
      {
        userName: new FormControl(this.currentUser.userName, [Validators.required]),
        password: new FormControl(this.currentUser.password, [Validators.required]),
        shouldRemember: new FormControl(this.currentUser.shouldRemember)
      },
      { validators: unauthorizedValidator }
    );
  }

  private writeToken(token: JwtTokenModel) {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    this.authFacade.writeToken(token, this.currentUser.shouldRemember ? date : null);
  }
}
