import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'wlodzimierz-conversation-message-create',
  templateUrl: './conversation-message-create.component.html',
  styleUrls: ['./conversation-message-create.component.scss']
})
export class ConversationMessageCreateComponent implements OnInit, ConversationMessageCreatedNotification {

  public sendMessageForm: FormGroup;
  private conversationModel: ConversationModel;
  private conversationSubject = new BehaviorSubject<ConversationModel>(new ConversationModel());
  private userModel: UserModel;
  private userSubject = new BehaviorSubject<UserModel>(new UserModel());
  private conversationMessage: ConversationMessageModel;

  public constructor(@Inject(ConversationMessagesServiceImpl) private conversationMessagesService: ConversationMessagesService) {
  }

  get message() {
    return this.sendMessageForm.get('message');
  }

  public get conversation(): ConversationModel {
    return this.conversationSubject.getValue();
  }

  @Input()
  public set conversation(value: ConversationModel) {
    this.conversationSubject.next(value);
  }

  public get user(): UserModel {
    return this.userSubject.getValue();
  }

  @Input()
  public set user(value: UserModel) {
    this.userSubject.next(value);
  }

  public ngOnInit(): void {
    this.refresh();
    this.setupForm();
  }

  public onSendMessage(): void {
    if (!this.sendMessageForm.valid) {
      return;
    }

    this.conversationMessage = this.sendMessageForm.getRawValue() as ConversationMessageModel;
    this.conversationMessage.conversation = this.conversationModel;
    this.conversationMessage.ownerUserId = this.userModel.userId;
    this.conversationMessagesService.create(new CreateCommand(this.conversationMessage), this);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
  public onCreatedFailed(error: HttpErrorResponse): void {
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public onCreatedSuccess(id: number): void {
    this.sendMessageForm.reset();
  }

  private refresh(): void {
    this.conversationSubject.subscribe((model: ConversationModel) => {
      this.conversationModel = model;
    });

    this.userSubject.subscribe((model: UserModel) => {
      this.userModel = model;
    });
  }

  private setupForm() {
    this.sendMessageForm = new FormGroup({
      message: new FormControl(this.conversationMessage?.message, [Validators.required])
    });
  }
}
