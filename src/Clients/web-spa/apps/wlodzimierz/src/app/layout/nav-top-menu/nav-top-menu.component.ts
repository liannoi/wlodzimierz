import { Component, Inject, OnDestroy, OnInit } from '@angular/core';

import { AuthFacadeImpl } from '@wlodzimierz/infrastructure/src/lib/storage/users/auth.facade';
import { AuthFacade } from '@wlodzimierz/application/src/lib/storage/users/auth.facade';
import { UserModel } from '@wlodzimierz/domain/src/lib/models/user.model';

import { HomeRouting } from '../../home/home.routing';
import { DocsRouting } from '../../docs/docs.routing';
import { AuthRouting } from '../../auth/auth.routing';
import { ChatRouting } from '../../chat/chat.routing';
import { VerifyCommand } from '@wlodzimierz/application/src/lib/storage/users/commands/verify.command';
import { VerifyNotification } from '@wlodzimierz/domain/src/lib/notifications/users/verify.notification';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'wlodzimierz-nav-top-menu',
  templateUrl: './nav-top-menu.component.html',
  styleUrls: ['./nav-top-menu.component.scss']
})
export class NavTopMenuComponent implements OnInit, OnDestroy, VerifyNotification {

  public homeRouting = HomeRouting;
  public docsRouting = DocsRouting;
  public authRouting = AuthRouting;
  public chatRouting = ChatRouting;
  public isExpanded = true;
  public currentUser: UserModel;

  public constructor(@Inject(AuthFacadeImpl) private authFacade: AuthFacade) {
  }

  public ngOnInit(): void {
    this.authFacade.verify(new VerifyCommand(this.authFacade.readToken()), this);
  }

  public ngOnDestroy(): void {
    this.authFacade.onDispose();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
  public onVerifyFailed(error: HttpErrorResponse): void {
  }

  public onVerifySuccess(user: UserModel): void {
    this.currentUser = user;
  }

  public isTokenVerified(): boolean {
    return this.authFacade.checkToken();
  }
}
