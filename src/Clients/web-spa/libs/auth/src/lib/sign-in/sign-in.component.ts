import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AbstractControl, FormControl, Validators } from '@angular/forms';

import { AuthFacade } from '@wlodzimierz/auth';

import { AuthFormGroup } from '../shared/forms/auth.form';
import { unauthorizedValidator } from '../shared/validators/unauthorized.validator';
import { defaultUser, User } from '../shared/models/user.model';
import { AuthFormService } from '../shared/services/auth-form.service';

@Component({
  selector: 'wlodzimierz-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {
  public signInForm: AuthFormGroup;
  private user: User = defaultUser();

  public constructor(
    private titleService: Title,
    private authFacade: AuthFacade,
    private authFormService: AuthFormService
  ) {
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
    this.authFormService.onDispose();
  }

  public onSignIn(): void {
    if (this.signInForm.invalid) {
      return;
    }

    this.user = this.signInForm.map<User>();
    this.authFacade.signIn(this.user);
  }

  ///////////////////////////////////////////////////////////////////////////
  // Helpers
  ///////////////////////////////////////////////////////////////////////////

  private setupForm(): void {
    this.signInForm = new AuthFormGroup(
      {
        userName: new FormControl(this.user.userName, [Validators.required]),
        password: new FormControl(this.user.password, [Validators.required]),
        shouldRemember: new FormControl(this.user.shouldRemember)
      },
      { validators: unauthorizedValidator }
    );
  }

  private followForm(): void {
    this.authFormService.follow(statusFailure => {
      if (!statusFailure) return;

      this.userName.setValue(this.user.userName);
      this.password.setValue('');
      this.signInForm.failure();
    });
  }
}
