import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

import {UserModel} from '../../../domain/models/user.model';
import {SignUpCommand} from '../../../application/storage/users/commands/sign-up.command';
import {UserSignUpNotification} from '../../../application/storage/users/notifications/user-sign-up.notification';
import {JwtTokenModel} from '../../../domain/models/jwt-token.model';
import {AuthFacadeImpl} from '../../../infrastructure/storage/users/auth.facade';
import {AuthFacade} from '../../../application/storage/users/auth.facade';
import {HomeRoutingConstants} from '../../home/home-routing.constants';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy, UserSignUpNotification {

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
    this.signUpFormGroup.setErrors({identity: true});
  }

  public onSignUpSuccess(token: JwtTokenModel): void {
    this.authFacade.writeToken(token);
    this.router.navigate([HomeRoutingConstants.Root]);
  }

  private setupForm(): void {
    this.signUpFormGroup = new FormGroup({
      username: new FormControl(this.user.userName, [
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
