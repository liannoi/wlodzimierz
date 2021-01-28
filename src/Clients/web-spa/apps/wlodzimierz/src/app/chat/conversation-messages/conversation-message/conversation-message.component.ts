import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { ConversationMessageModel } from '@wlodzimierz/domain/src/lib/models/conversation-message.model';
import { UserModel } from '@wlodzimierz/domain/src/lib/models/user.model';
import { ConversationMessageSubscriber } from '@wlodzimierz/application/src/lib/storage/conversation-messages/subscribers/conversation-message.subscriber';
import { UserSubscriber } from '@wlodzimierz/application/src/lib/storage/users/subscribers/user.subscriber';

@Component({
  selector: 'wlodzimierz-conversation-message',
  templateUrl: './conversation-message.component.html',
  styleUrls: ['./conversation-message.component.scss']
})
export class ConversationMessageComponent implements OnInit, OnDestroy {
  public currentMessage: ConversationMessageModel;
  public currentUser: UserModel;
  private messageSubscriber: ConversationMessageSubscriber = new ConversationMessageSubscriber();
  private userSubscriber: UserSubscriber = new UserSubscriber();

  ///////////////////////////////////////////////////////////////////////////
  // Processing the received message from a parent component
  ///////////////////////////////////////////////////////////////////////////

  public get message(): ConversationMessageModel {
    return this.messageSubscriber.model;
  }

  @Input()
  public set message(value: ConversationMessageModel) {
    this.messageSubscriber.model = value;
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
  // Interface handlers
  ///////////////////////////////////////////////////////////////////////////

  public ngOnInit(): void {
    this.followUser();
    this.followMessage();
  }

  public ngOnDestroy(): void {
    this.messageSubscriber.onDispose();
    this.userSubscriber.onDispose();
  }

  ///////////////////////////////////////////////////////////////////////////
  // Helpers
  ///////////////////////////////////////////////////////////////////////////

  private followUser(): void {
    this.userSubscriber.follow((user: UserModel) => this.currentUser = user);
  }

  private followMessage(): void {
    this.messageSubscriber.follow((message: ConversationMessageModel) => this.currentMessage = message);
  }
}
