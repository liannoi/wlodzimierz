import { Component, Inject, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

import { ConversationModel } from '@wlodzimierz/domain/src/lib/models/conversation.model';
import { UserModel } from '@wlodzimierz/domain/src/lib/models/user.model';
import { AuthFacadeImpl } from '@wlodzimierz/infrastructure/src/lib/storage/users/auth.facade';
import { AuthFacade } from '@wlodzimierz/application/src/lib/storage/users/auth.facade';
import { VerifyCommand } from '@wlodzimierz/application/src/lib/storage/users/commands/verify.command';
import { VerifyNotification } from '@wlodzimierz/domain/src/lib/notifications/users/verify.notification';
import { HomeRouting } from '../home/home.routing';
import { Router } from '@angular/router';

@Component({
  selector: 'wlodzimierz-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, VerifyNotification {
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public onVerifyFailed(error: HttpErrorResponse): void {
    this.authFacade.clearToken();
    this.router.navigate([HomeRouting.Root]);
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
