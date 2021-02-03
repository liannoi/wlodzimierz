import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';

import { ConversationModel } from '@wlodzimierz/domain/src/lib/models/conversation.model';
import { UserModel } from '@wlodzimierz/domain/src/lib/models/user.model';
import { AuthFacadeImpl } from '@wlodzimierz/infrastructure/src/lib/storage/users/auth.facade';
import { AuthFacade } from '@wlodzimierz/application/src/lib/storage/users/auth.facade';
import { VerifyCommand } from '@wlodzimierz/application/src/lib/storage/users/commands/verify.command';
import { VerifyNotification } from '@wlodzimierz/domain/src/lib/notifications/users/verify.notification';

import { AuthRouting } from '../auth/auth.routing';

@Component({
  selector: 'wlodzimierz-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy, VerifyNotification {
  public currentConversation: ConversationModel;
  public currentUser: UserModel;

  public constructor(
    @Inject(AuthFacadeImpl) private authFacade: AuthFacade,
    private titleService: Title,
    private router: Router
  ) {
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public onVerifyFailed(error: HttpErrorResponse): void {
    this.authFacade.clearToken();
    this.router.navigate([AuthRouting.SignIn]);
  }

  public onVerifySuccess(user: UserModel): void {
    this.currentUser = user;
  }

  ///////////////////////////////////////////////////////////////////////////
  // Ignition events
  ///////////////////////////////////////////////////////////////////////////

  public onConversationChanged(conversation: ConversationModel): void {
    this.currentConversation = conversation;
  }

  ///////////////////////////////////////////////////////////////////////////
  // Helpers
  ///////////////////////////////////////////////////////////////////////////

  private verify(): void {
    this.authFacade.verify(new VerifyCommand(this.authFacade.readToken()), this);
  }
}
