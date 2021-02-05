import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Observable, Subscription } from 'rxjs';

import { AuthFormGroup } from '../shared/forms/auth.form';
import { UsersStore } from '../shared/stores/users.store';
import { unauthorizedValidator } from '../shared/validators/unauthorized.validator';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'wlodzimierz-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {
  public signInForm: AuthFormGroup;
  private currentUser$: Observable<User>;
  private subscriptions: Subscription[] = [];

  public constructor(
    private usersStore: UsersStore,
    private formBuilder: FormBuilder,
    private router: Router,
    private titleService: Title
  ) {
    titleService.setTitle('Sign in to Wlodzimierz - Wlodzimierz');
    this.currentUser$ = usersStore.currentUser.value$;
  }

  ///////////////////////////////////////////////////////////////////////////
  // Form controls
  ///////////////////////////////////////////////////////////////////////////

  public get userName(): AbstractControl {
    return this.signInForm.take('userName');
  }

  public get password(): AbstractControl {
    return this.signInForm.take('password');
  }

  ///////////////////////////////////////////////////////////////////////////
  // Interface handlers
  ///////////////////////////////////////////////////////////////////////////

  public ngOnInit(): void {
    this.followUser();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
  }

  public onSignIn(): void {
    if (this.signInForm.invalid) {
      return;
    }

    this.usersStore.setCurrentUser(this.signInForm.map<User>());
    this.usersStore.signIn();
  }

  ///////////////////////////////////////////////////////////////////////////
  // Helpers
  ///////////////////////////////////////////////////////////////////////////

  private followUser(): void {
    const subscription = this.currentUser$.subscribe((model: User) => this.setupForm(model));
    this.subscriptions.push(subscription);
  }

  private setupForm(user: User): void {
    this.signInForm = new AuthFormGroup(
      {
        userName: new FormControl(user.userName, [Validators.required]),
        password: new FormControl(user.password, [Validators.required]),
        shouldRemember: new FormControl(user.shouldRemember, [Validators.required])
      },
      { validators: unauthorizedValidator }
    );
  }
}
