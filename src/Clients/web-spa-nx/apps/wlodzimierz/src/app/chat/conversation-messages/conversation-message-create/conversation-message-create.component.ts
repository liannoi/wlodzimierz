import { Component, Inject, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';

import { ConversationMessageModel } from '@wlodzimierz/domain/src/lib/models/conversation-message.model';
import { ConversationModel } from '@wlodzimierz/domain/src/lib/models/conversation.model';
import { UserModel } from '@wlodzimierz/domain/src/lib/models/user.model';
// eslint-disable-next-line max-len
import { ConversationMessagesServiceImpl } from '@wlodzimierz/infrastructure/src/lib/storage/conversation-messages/conversation-messages.service';
import { ConversationMessagesService } from '@wlodzimierz/application/src/lib/storage/conversation-messages/conversation-messages.service';
import { CreateCommand } from '@wlodzimierz/application/src/lib/storage/conversation-messages/commands/create.command';
// eslint-disable-next-line max-len
import { ConversationMessageCreatedNotification } from '@wlodzimierz/application/src/lib/storage/conversation-messages/notifications/conversation-message-created.notification';
import { VerifyCommand } from '@wlodzimierz/application/src/lib/storage/users/commands/verify.command';
import { AuthFacadeImpl } from '@wlodzimierz/infrastructure/src/lib/storage/users/auth/auth.facade';
import { AuthFacade } from '@wlodzimierz/application/src/lib/storage/users/auth.facade';
import { VerifyNotification } from '@wlodzimierz/application/src/lib/storage/users/notifications/verify.notification';

@Component({
  selector: 'wlodzimierz-conversation-message-create',
  templateUrl: './conversation-message-create.component.html',
  styleUrls: ['./conversation-message-create.component.scss']
})
export class ConversationMessageCreateComponent
  implements OnInit, ConversationMessageCreatedNotification, VerifyNotification {
  public group: FormGroup;
  private currentUser: UserModel;
  private currentConversation: ConversationModel;
  private currentMessage: ConversationMessageModel;
  private conversationSubject = new BehaviorSubject<ConversationModel>(new ConversationModel());

  public constructor(
    @Inject(ConversationMessagesServiceImpl) private conversationMessagesService: ConversationMessagesService,
    @Inject(AuthFacadeImpl) private authFacade: AuthFacade
  ) {
  }

  ///////////////////////////////////////////////////////////////////////////
  // Form controls
  ///////////////////////////////////////////////////////////////////////////

  public get message(): AbstractControl {
    return this.group.get('message') as AbstractControl;
  }

  ///////////////////////////////////////////////////////////////////////////
  // Processing the received conversation from a parent component
  ///////////////////////////////////////////////////////////////////////////

  public get conversation(): ConversationModel {
    return this.conversationSubject.getValue();
  }

  @Input()
  public set conversation(value: ConversationModel) {
    this.conversationSubject.next(value);
  }

  ///////////////////////////////////////////////////////////////////////////
  // Interface handlers
  ///////////////////////////////////////////////////////////////////////////

  public ngOnInit(): void {
    this.setupForm();
    this.refresh();
  }

  public onSendMessage(): void {
    if (this.group.invalid) {
      return;
    }

    this.currentMessage = this.group.getRawValue() as ConversationMessageModel;
    this.currentMessage.conversation = this.currentConversation;
    this.currentMessage.ownerUserId = this.currentUser.userId;
    this.conversationMessagesService.create(new CreateCommand(this.currentMessage), this);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
  public onCreatedFailed(error: HttpErrorResponse): void {
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public onCreatedSuccess(id: number): void {
    this.group.reset();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
  public onVerifyFailed(error: HttpErrorResponse): void {
  }

  public onVerifySuccess(user: UserModel): void {
    this.currentUser = user;
  }

  ///////////////////////////////////////////////////////////////////////////
  // Helpers
  ///////////////////////////////////////////////////////////////////////////

  private refresh(): void {
    this.authFacade.verify(new VerifyCommand(this.authFacade.readToken()), this);
    this.conversationSubject.subscribe((model: ConversationModel) => this.currentConversation = model);
  }

  private setupForm(): void {
    this.group = new FormGroup({
      message: new FormControl(this.currentMessage?.message, [Validators.required])
    });
  }
}
