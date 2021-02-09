import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { AuthFormGroup } from '../shared/form/auth-form.model';
import { defaultUser, User } from '../shared/models/user.model';
import { AuthFormFacade } from '../shared/form/auth-form.facade';
import { AuthFacade } from '../+state/auth.facade';

@Component({
  selector: 'wlodzimierz-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {
  public signUpForm: AuthFormGroup;
  private user: User = defaultUser();

  public constructor(private titleService: Title, private authFacade: AuthFacade, private formFacade: AuthFormFacade) {
    this.titleService.setTitle('Join Wlodzimierz - Wlodzimierz');
  }

  ///////////////////////////////////////////////////////////////////////////
  // Form controls
  ///////////////////////////////////////////////////////////////////////////

  public get userName(): AbstractControl {
    return this.signUpForm.select('userName');
  }

  public get password(): AbstractControl {
    return this.signUpForm.select('password');
  }

  public get email(): AbstractControl {
    return this.signUpForm.select('email');
  }

  ///////////////////////////////////////////////////////////////////////////
  // Interface handlers
  ///////////////////////////////////////////////////////////////////////////

  public ngOnInit(): void {
    this.setupForm();
    this.followForm();
  }

  public ngOnDestroy(): void {
    this.formFacade.onDispose();
  }

  public onSignUp(): void {
    if (this.signUpForm.invalid) {
      return;
    }

    this.user = this.signUpForm.map<User>();
    this.authFacade.signUp(this.user);
  }

  ///////////////////////////////////////////////////////////////////////////
  // Helpers
  ///////////////////////////////////////////////////////////////////////////

  private setupForm(): void {
    this.signUpForm = new AuthFormGroup({
      userName: new FormControl(this.user.userName, [
        Validators.required,
        Validators.pattern('^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$')
      ]),
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.pattern(
          '^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
        )
      ]),
      password: new FormControl(this.user.password, [
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$')
      ])
    });
  }

  private followForm(): void {
    this.formFacade.followSignUp((state) => {
      if (!state.isFailure) return;

      this.userName.setValue(this.user.userName);
      this.password.setValue('');
      this.signUpForm.identityFailure(state.error.errors[''][0]);
    });
  }
}
