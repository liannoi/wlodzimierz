import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

import {UserModel} from '../core/models/user.model';
import {AuthService} from '../core/auth.service';
import {OnSignUpHandler} from '../core/commands/sign-up/on-sign-up.handler';
import {JwtTokenModel} from '../core/models/jwt-token.model';
import {SignUpCommand} from '../core/commands/sign-up/sign-up.command';
import {ApplicationPaths} from '../../shared/app.constants';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy, OnSignUpHandler {

  public signUpFormGroup!: FormGroup;
  public haveFirstAttempt = false;
  public identityError!: HttpErrorResponse;

  private user: UserModel = new UserModel();

  constructor(private authService: AuthService, private router: Router, private titleService: Title) {
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
    this.authService.onDispose();
  }

  public onSignUpFailed(error: HttpErrorResponse): void {
    this.username.setValue(this.user.username);
    this.password.setValue('');
    this.haveFirstAttempt = true;
    this.identityError = error;
    this.signUpFormGroup.setErrors({identity: true});
  }

  public onSignUpSuccess(token: JwtTokenModel): void {
    this.authService.writeToken(token);
    this.router.navigate([ApplicationPaths.Home]);
  }

  public onSignUp(): void {
    if (!this.signUpFormGroup.valid) {
      return;
    }

    this.user = this.signUpFormGroup.getRawValue() as UserModel;
    this.authService.signUp(new SignUpCommand(this.user), this);
  }

  ///////////////////////////////////////////////////////////////////////////
  // Helpers
  ///////////////////////////////////////////////////////////////////////////

  private setupForm(): void {
    this.signUpFormGroup = new FormGroup({
      username: new FormControl(this.user.username, [
        Validators.required,
      ]),
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.minLength(6)
      ]),
      password: new FormControl(this.user.password, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$')
      ]),
    });
  }
}
