import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { ConversationMessageModel } from '@wlodzimierz/domain/src/lib/models/conversation-message.model';
import { ConversationModel } from '@wlodzimierz/domain/src/lib/models/conversation.model';
import { UserModel } from '@wlodzimierz/domain/src/lib/models/user.model';
import { ConversationMessagesServiceImpl } from '@wlodzimierz/infrastructure/src/lib/storage/conversation-messages/conversation-messages.service';
import { ConversationMessagesService } from '@wlodzimierz/application/src/lib/storage/conversation-messages/conversation-messages.service';
import { CreateCommand } from '@wlodzimierz/application/src/lib/storage/conversation-messages/commands/create.command';
import { ConversationMessageCreatedNotification } from '@wlodzimierz/domain/src/lib/notifications/conversation-messages/conversation-message-created.notification';
import { ConversationSubscriber } from '@wlodzimierz/application/src/lib/storage/conversations/subscribers/conversation.subscriber';
import { UserSubscriber } from '@wlodzimierz/application/src/lib/storage/users/subscribers/user.subscriber';

@Component({
  selector: 'wlodzimierz-conversation-message-create',
  templateUrl: './conversation-message-create.component.html',
  styleUrls: ['./conversation-message-create.component.scss']
})
export class ConversationMessageCreateComponent implements OnInit, OnDestroy, ConversationMessageCreatedNotification {
  public group: FormGroup;
  private currentUser: UserModel;
  private currentConversation: ConversationModel;
  private currentMessage: ConversationMessageModel;
  private conversationSubscriber: ConversationSubscriber = new ConversationSubscriber();
  private userSubscriber: UserSubscriber = new UserSubscriber();

  public constructor(
    @Inject(ConversationMessagesServiceImpl) private conversationMessagesService: ConversationMessagesService
  ) {
  }

  ///////////////////////////////////////////////////////////////////////////
  // Form controls
  ///////////////////////////////////////////////////////////////////////////

  public get message(): AbstractControl {
    return this.group.get('message') as AbstractControl;
  }

  ///////////////////////////////////////////////////////////////////////////
  // Processing the received user from a parent component
  ///////////////////////////////////////////////////////////////////////////

  public get user(): UserModel {
    return this.userSubscriber.model;
  }

  @Input()
  public set user(value: UserModel) {
    this.userSubscriber.model = value;
  }

  ///////////////////////////////////////////////////////////////////////////
  // Processing the received conversation from a parent component
  ///////////////////////////////////////////////////////////////////////////

  public get conversation(): ConversationModel {
    return this.conversationSubscriber.model;
  }

  @Input()
  public set conversation(value: ConversationModel) {
    this.conversationSubscriber.model = value;
  }

  ///////////////////////////////////////////////////////////////////////////
  // Interface handlers
  ///////////////////////////////////////////////////////////////////////////

  public ngOnInit(): void {
    this.setupForm();
    this.followUser();
    this.followConversation();
  }

  public ngOnDestroy(): void {
    this.conversationMessagesService.onDispose();
    this.conversationSubscriber.onDispose();
    this.userSubscriber.onDispose();
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

  ///////////////////////////////////////////////////////////////////////////
  // Helpers
  ///////////////////////////////////////////////////////////////////////////

  private setupForm(): void {
    this.group = new FormGroup({
      message: new FormControl(this.currentMessage?.message, [Validators.required])
    });
  }

  private followConversation() {
    this.conversationSubscriber.follow((model: ConversationModel) => (this.currentConversation = model));
  }

  private followUser() {
    this.userSubscriber.follow((user: UserModel) => (this.currentUser = user));
  }
}
