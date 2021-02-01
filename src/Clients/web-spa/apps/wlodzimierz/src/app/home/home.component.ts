import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthFacadeImpl } from '@wlodzimierz/infrastructure/src/lib/storage/users/services/auth.facade';
import { AuthFacade } from '@wlodzimierz/application/src/lib/storage/users/services/auth.facade';
import { UserModel } from '@wlodzimierz/domain/src/lib/models/user.model';
import { VerifyNotification } from '@wlodzimierz/domain/src/lib/notifications/users/verify.notification';
import { VerifyCommand } from '@wlodzimierz/application/src/lib/storage/users/commands/verify.command';

@Component({
  selector: 'wlodzimierz-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, VerifyNotification {
  public constructor(@Inject(AuthFacadeImpl) private authFacade: AuthFacade, private titleService: Title) {
    titleService.setTitle('Wlodzimierz');
  }

  ///////////////////////////////////////////////////////////////////////////
  // Interface handlers
  ///////////////////////////////////////////////////////////////////////////

  public ngOnInit(): void {
    this.verify();
  }

  public ngOnDestroy(): void {
    this.authFacade.onDispose();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  public onVerifyFailed(error: HttpErrorResponse): void {
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  public onVerifySuccess(user: UserModel): void {
  }

  ///////////////////////////////////////////////////////////////////////////
  // Helpers
  ///////////////////////////////////////////////////////////////////////////

  private verify(): void {
    this.authFacade.verify(new VerifyCommand(this.authFacade.readToken()), this);
  }
}
