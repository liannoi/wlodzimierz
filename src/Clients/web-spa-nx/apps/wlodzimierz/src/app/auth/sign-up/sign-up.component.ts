import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { SignUpNotification } from '@wlodzimierz/application/src/lib/storage/users/notifications/sign-up.notification';
import { UserModel } from '@wlodzimierz/domain/src/lib/models/user.model';
import { AuthFacadeImpl } from '@wlodzimierz/infrastructure/src/lib/storage/users/auth.facade';
import { AuthFacade } from '@wlodzimierz/application/src/lib/storage/users/auth.facade';
import { SignUpCommand } from '@wlodzimierz/application/src/lib/storage/users/commands/sign-up.command';
import { JwtTokenModel } from '@wlodzimierz/domain/src/lib/models/jwt-token.model';

import { HomeRouting } from '../../home/home.routing';

@Component({
  selector: 'wlodzimierz-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy, SignUpNotification {

  public signUpFormGroup!: FormGroup;
  public haveFirstAttempt = false;
  public identityError!: HttpErrorResponse;

  private user: UserModel = new UserModel();

  constructor(@Inject(AuthFacadeImpl) private authFacade: AuthFacade, private router: Router, private titleService: Title) {
    titleService.setTitle('Join Wlodzimierz - Wlodzimierz');
  }

  get username(): AbstractControl {
    return this.signUpFormGroup.get('username') as AbstractControl;
  }

  get password(): AbstractControl {
    return this.signUpFormGroup.get('password') as AbstractControl;
  }

  get email(): AbstractControl {
    return this.signUpFormGroup.get('email') as AbstractControl;
  }

  public ngOnInit(): void {
    this.setupForm();
  }

  public ngOnDestroy(): void {
    this.authFacade.onDispose();
  }

  public onSignUp(): void {
    if (!this.signUpFormGroup.valid) {
      return;
    }

    this.user = this.signUpFormGroup.getRawValue() as UserModel;
    this.authFacade.signUp(new SignUpCommand(this.user), this);
  }

  public onSignUpFailed(error: HttpErrorResponse): void {
    this.username.setValue(this.user.userName);
    this.password.setValue('');
    this.haveFirstAttempt = true;
    this.identityError = error;
    this.signUpFormGroup.setErrors({ identity: true });
  }

  public onSignUpSuccess(token: JwtTokenModel): void {
    this.authFacade.writeToken(token);
    this.router.navigate([HomeRouting.Root]);
  }

  private setupForm(): void {
    this.signUpFormGroup = new FormGroup({
      username: new FormControl(this.user.userName, [
        Validators.required
      ]),
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.minLength(6)
      ]),
      password: new FormControl(this.user.password, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$')
      ])
    });
  }
}

