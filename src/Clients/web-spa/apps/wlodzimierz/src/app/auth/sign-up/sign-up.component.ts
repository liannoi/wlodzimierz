import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { SignUpNotification } from '@wlodzimierz/domain/src/lib/notifications/users/sign-up.notification';
import { UserModel } from '@wlodzimierz/domain/src/lib/models/user.model';
import { AuthFacadeImpl } from '@wlodzimierz/infrastructure/src/lib/storage/users/auth.facade';
import { AuthFacade } from '@wlodzimierz/application/src/lib/storage/users/auth.facade';
import { SignUpCommand } from '@wlodzimierz/application/src/lib/storage/users/commands/sign-up.command';
import { JwtTokenModel } from '@wlodzimierz/domain/src/lib/models/jwt-token.model';

import { HomeRouting } from '../../home/home.routing';
import { AuthFormGroup } from '../shared/auth-form-group.class';

@Component({
  selector: 'wlodzimierz-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy, SignUpNotification {
  public group: AuthFormGroup;
  private currentUser: UserModel = new UserModel();

  public constructor(
    @Inject(AuthFacadeImpl) private authFacade: AuthFacade,
    private router: Router,
    private titleService: Title
  ) {
    titleService.setTitle('Join Wlodzimierz - Wlodzimierz');
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

  public get email(): AbstractControl {
    return this.group.get('email') as AbstractControl;
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

  public onSignUp(): void {
    if (this.group.invalid) {
      return;
    }

    this.currentUser = this.group.getRawValue() as UserModel;
    this.authFacade.signUp(new SignUpCommand(this.currentUser), this);
  }

  public onSignUpFailed(error: HttpErrorResponse): void {
    this.userName.setValue(this.currentUser.userName);
    this.password.setValue('');
    this.group.identityFailed(error);
  }

  public onSignUpSuccess(token: JwtTokenModel): void {
    this.group.writeToken(this.currentUser, this.authFacade, token);
    this.router.navigate([HomeRouting.Root]);
  }

  ///////////////////////////////////////////////////////////////////////////
  // Helpers
  ///////////////////////////////////////////////////////////////////////////

  private setupForm(): void {
    this.group = new AuthFormGroup({
      userName: new FormControl(this.currentUser.userName, [Validators.required]),
      email: new FormControl(this.currentUser.email, [Validators.required, Validators.minLength(6)]),
      password: new FormControl(this.currentUser.password, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$')
      ])
    });
  }
}
