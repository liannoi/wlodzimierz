import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

import {UserModel} from '../shared/models/user.model';
import {AuthService} from '../shared/services/auth.service';
import {OnSignUp} from '../shared/commands/sign-up/on-sign-up.interface';
import {JwtTokenModel} from '../shared/models/jwt-token.model';
import {SignUpCommand} from '../shared/commands/sign-up/sign-up.command';
import {ApplicationPaths} from '../../shared/app.constants';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy, OnSignUp {

  public signUpFormGroup!: FormGroup;

  private user: UserModel = new UserModel();

  constructor(private authService: AuthService, private router: Router, private titleService: Title) {
    titleService.setTitle('Join Wlodzimierz - Wlodzimierz');
  }

  get username(): AbstractControl | null {
    return this.signUpFormGroup.get('username');
  }

  get password(): AbstractControl | null {
    return this.signUpFormGroup.get('password');
  }

  public ngOnInit(): void {
    this.setupForm();
  }

  public ngOnDestroy(): void {
    this.authService.onDispose();
  }

  public onSignUpFailed(error: HttpErrorResponse): void {
    this.username?.setValue(this.user.username);
    this.password?.setValue('');
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
      username: new FormControl(this.user.username),
      password: new FormControl(this.user.password)
    });
  }
}
