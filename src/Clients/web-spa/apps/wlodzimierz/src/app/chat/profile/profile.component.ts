import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { VerifyNotification } from '@wlodzimierz/domain/src/lib/notifications/users/verify.notification';
import { UserModel } from '@wlodzimierz/domain/src/lib/models/user.model';
import { AuthFacadeImpl } from '@wlodzimierz/infrastructure/src/lib/storage/users/services/auth.facade';
import { AuthFacade } from '@wlodzimierz/application/src/lib/storage/users/services/auth.facade';
import { VerifyCommand } from '@wlodzimierz/application/src/lib/storage/users/commands/verify.command';

import { AuthRouting } from '../../auth/auth.routing';

@Component({
  selector: 'wlodzimierz-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy, VerifyNotification {
  public currentUser: UserModel;

  public constructor(
    @Inject(AuthFacadeImpl) private authFacade: AuthFacade,
    private router: Router,
    private titleService: Title
  ) {
    titleService.setTitle('Profile - Wlodzimierz');
  }

  ///////////////////////////////////////////////////////////////////////////
  // Interface handlers
  ///////////////////////////////////////////////////////////////////////////

  public ngOnInit(): void {
    this.authFacade.verify(new VerifyCommand(this.authFacade.readToken()), this);
  }

  public ngOnDestroy(): void {
    this.authFacade.onDispose();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public onVerifyFailed(error: HttpErrorResponse): void {
    this.authFacade.clearToken();
    this.router.navigate([AuthRouting.SignIn]);
  }

  public onVerifySuccess(user: UserModel): void {
    this.currentUser = user;
    console.log(user);
  }
}
