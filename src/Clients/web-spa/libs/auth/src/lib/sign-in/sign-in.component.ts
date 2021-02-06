import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { AbstractControl, FormControl, Validators } from "@angular/forms";

import { AuthFacade } from "@wlodzimierz/auth";

import { AuthFormGroup } from "../shared/forms/auth.form";
import { unauthorizedValidator } from "../shared/validators/unauthorized.validator";
import { defaultUser, User } from "../shared/models/user.model";

@Component({
  selector: "wlodzimierz-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"],
})
export class SignInComponent implements OnInit {
  public signInForm: AuthFormGroup;
  private user: User = defaultUser();

  public constructor(private authFacade: AuthFacade, private router: Router, private titleService: Title) {
    titleService.setTitle("Sign in to Wlodzimierz - Wlodzimierz");
  }

  ///////////////////////////////////////////////////////////////////////////
  // Form controls
  ///////////////////////////////////////////////////////////////////////////

  public get userName(): AbstractControl {
    return this.signInForm.select("userName");
  }

  public get password(): AbstractControl {
    return this.signInForm.select("password");
  }

  ///////////////////////////////////////////////////////////////////////////
  // Interface handlers
  ///////////////////////////////////////////////////////////////////////////

  public ngOnInit(): void {
    this.setupForm();
  }

  public onSignIn(): void {
    if (this.signInForm.invalid) {
      return;
    }

    this.authFacade.signIn(this.signInForm.map<User>(this.user));
  }

  ///////////////////////////////////////////////////////////////////////////
  // Helpers
  ///////////////////////////////////////////////////////////////////////////

  private setupForm(): void {
    this.signInForm = new AuthFormGroup(
      {
        userName: new FormControl(this.user.userName, [Validators.required]),
        password: new FormControl(this.user.password, [Validators.required]),
        shouldRemember: new FormControl(this.user.shouldRemember),
      },
      { validators: unauthorizedValidator }
    );
  }
}
