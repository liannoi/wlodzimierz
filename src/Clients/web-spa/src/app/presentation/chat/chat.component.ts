import {Component, Inject, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';

import {ConversationModel} from '../../domain/models/conversation.model';
import {UserModel} from '../../domain/models/user.model';
import {VerifyCommand} from '../../application/storage/users/commands/verify.command';
import {AuthFacade} from '../../application/storage/users/auth.facade';
import {AuthFacadeImpl} from '../../infrastructure/storage/users/auth.facade';
import {UserVerifyNotification} from '../../application/storage/users/notifications/user-verify.notification';
import {AuthRoutingConstants} from '../auth/auth-routing.constants';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, UserVerifyNotification {

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
    this.router.navigate([AuthRoutingConstants.SignIn]);
  }

  public onVerifySuccess(user: UserModel): void {
    this.user = user;
  }
}
