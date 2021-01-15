import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

import {UserModel} from '../auth/core/models/user.model';
import {VerifyCommand} from '../auth/core/commands/verify/verify.command';
import {AuthService} from '../auth/core/auth.service';
import {OnVerifyHandler} from '../auth/core/commands/verify/on-verify.handler';
import {AuthenticationPaths} from '../auth/shared/auth.constants';

@Component({
  selector: 'app-app',
  templateUrl: './web-app.component.html',
  styleUrls: ['./web-app.component.scss']
})
export class WebAppComponent implements OnInit, OnVerifyHandler {

  public user!: UserModel;

  public constructor(private authService: AuthService, private router: Router) {
  }

  public ngOnInit() {
    this.authService.verify(new VerifyCommand(this.authService.readToken()), this);
  }

  public onVerifySuccess(user: UserModel): void {
    this.user = user;
  }

  public onVerifyFailed(error: HttpErrorResponse): void {
    this.authService.clearToken();
    this.router.navigate([AuthenticationPaths.SignIn]);
  }
}
