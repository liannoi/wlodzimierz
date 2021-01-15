import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';

import {UserModel} from '../auth/core/models/user.model';
import {VerifyCommand} from '../auth/core/commands/verify/verify.command';
import {AuthService} from '../auth/core/auth.service';
import {OnVerifyHandler} from '../auth/core/commands/verify/on-verify.handler';
import {AuthenticationPaths} from '../auth/shared/auth.constants';
import {ConversationModel} from './conversations/shared/models/conversation.model';
import {ConversationMessageModel} from './conversation-messages/shared/models/conversation-message.model';
import {ConversationMessagesService} from './conversation-messages/shared/conversation-messages.service';
import {CreateCommand} from './conversation-messages/shared/commands/create.command';
import {OnCreateHandler} from './conversation-messages/shared/commands/on-create.handler';

@Component({
  selector: 'app-app',
  templateUrl: './web-app.component.html',
  styleUrls: ['./web-app.component.scss']
})
export class WebAppComponent implements OnInit, OnVerifyHandler, OnDestroy, OnCreateHandler {

  public user!: UserModel;
  public currentConversation!: ConversationModel;
  public messageFormGroup!: FormGroup;
  public conversationMessage!: ConversationMessageModel;

  public constructor(
    private authService: AuthService,
    private router: Router,
    private title: Title,
    private conversationMessagesService: ConversationMessagesService) {
    title.setTitle('Wlodzimierz App');
  }

  get message(): AbstractControl {
    return this.messageFormGroup.get('message') as AbstractControl;
  }

  public ngOnInit(): void {
    this.authService.verify(new VerifyCommand(this.authService.readToken()), this);
    this.setupForm();
  }

  public ngOnDestroy(): void {
    this.authService.onDispose();
  }

  public onConversationChanged(conversation: ConversationModel): void {
    this.currentConversation = conversation;
  }

  public onSendMessage(): void {
    if (this.messageFormGroup.invalid) {
      return;
    }

    this.conversationMessage = this.messageFormGroup.getRawValue() as ConversationMessageModel;
    this.conversationMessage.conversation = this.currentConversation;
    this.conversationMessage.ownerUserId = this.user.userId;

    this.conversationMessagesService.create(new CreateCommand(this.conversationMessage.conversation,
      this.conversationMessage.ownerUserId,
      this.conversationMessage.message,
      this.conversationMessage.publish), this);
  }

  public onCreateFailed(error: HttpErrorResponse): void {
  }

  public onCreateSuccess(id: number): void {
    this.messageFormGroup.reset();
  }

  public onVerifySuccess(user: UserModel): void {
    this.user = user;
  }

  public onVerifyFailed(error: HttpErrorResponse): void {
    this.authService.clearToken();
    this.router.navigate([AuthenticationPaths.SignIn]);
  }

  private setupForm(): void {
    this.messageFormGroup = new FormGroup({
      message: new FormControl(this.conversationMessage?.message, [Validators.required])
    });
  }
}
