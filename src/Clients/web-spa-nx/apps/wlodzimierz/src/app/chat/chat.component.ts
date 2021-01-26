import { Component, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { ConversationModel } from '@wlodzimierz/domain/src/lib/models/conversation.model';
import { UserModel } from '@wlodzimierz/domain/src/lib/models/user.model';
import { AuthFacadeImpl } from '@wlodzimierz/infrastructure/src/lib/storage/users/auth/auth.facade';
import { AuthFacade } from '@wlodzimierz/application/src/lib/storage/users/auth.facade';
import { VerifyCommand } from '@wlodzimierz/application/src/lib/storage/users/commands/verify.command';
import { VerifyNotification } from '@wlodzimierz/application/src/lib/storage/users/notifications/verify.notification';

import { AuthRouting } from '../auth/auth.routing';

@Component({
  selector: 'wlodzimierz-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, VerifyNotification {

  public conversation!: ConversationModel;
  public user!: UserModel;

  public constructor(private titleService: Title, @Inject(AuthFacadeImpl) private authFacade: AuthFacade, private router: Router) {
    titleService.setTitle('Wlodzimierz');
  }

  public ngOnInit(): void {
    this.authFacade.verify(new VerifyCommand(this.authFacade.readToken()), this);
  }

  public onConversationChanged(conversation: ConversationModel): void {
    this.conversation = conversation;
  }

  public onVerifyFailed(error: HttpErrorResponse): void {
    this.authFacade.clearToken();
    this.router.navigate([AuthRouting.SignIn]);
  }

  public onVerifySuccess(user: UserModel): void {
    this.user = user;
  }
}
