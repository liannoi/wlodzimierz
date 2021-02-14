import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { UsersFacade } from '@wlodzimierz/users';

import { defaultModel } from '../../../../storage/src/lib/common/defaults/model.default';
import { User } from '../shared/models/user.model';
import { AuthFormGroup } from '../shared/forms/auth-form.model';
import { AuthFormFacade } from '../shared/forms/auth-form.facade';
import { unauthorizedValidator } from '../shared/validators/unauthorized.validator';

@Component({
  selector: 'wlodzimierz-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {
  public signInForm: AuthFormGroup;
  private user: User = defaultModel();

  public constructor(private titleService: Title, private usersFacade: UsersFacade, private formFacade: AuthFormFacade) {
    this.titleService.setTitle('Sign in to Wlodzimierz - Wlodzimierz');
  }

  ///////////////////////////////////////////////////////////////////////////
  // Form controls
  ///////////////////////////////////////////////////////////////////////////

  public get userName(): AbstractControl {
    return this.signInForm.select('userName');
  }

  public get password(): AbstractControl {
    return this.signInForm.select('password');
  }

  ///////////////////////////////////////////////////////////////////////////
  // Interface handlers
  ///////////////////////////////////////////////////////////////////////////

  public ngOnInit(): void {
    this.setupForm();
    this.followForm();
  }

  public ngOnDestroy(): void {
    this.formFacade.dispose();
  }

  public signIn(): void {
    if (this.signInForm.invalid) {
      return;
    }

    this.user = this.signInForm.map<User>();
    this.usersFacade.signIn(this.user);
  }

  ///////////////////////////////////////////////////////////////////////////
  // Helpers
  ///////////////////////////////////////////////////////////////////////////

  private setupForm(): void {
    this.signInForm = new AuthFormGroup(
      {
        userName: new FormControl(this.user.userName, [
          Validators.required,
          Validators.pattern('^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$')
        ]),
        password: new FormControl(this.user.password, [Validators.required]),
        shouldRemember: new FormControl(this.user.shouldRemember)
      },
      { validators: unauthorizedValidator }
    );
  }

  private followForm(): void {
    this.formFacade.followSignIn(isFailure => {
      if (!isFailure) return;

      this.userName.setValue(this.user.userName);
      this.password.setValue('');
      this.signInForm.markAsFailure();
    });
  }
}
