import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { ConversationModel } from '@wlodzimierz/domain/src/lib/models/conversation.model';
import { UserModel } from '@wlodzimierz/domain/src/lib/models/user.model';
import { ConversationSubscriber } from '@wlodzimierz/application/src/lib/storage/conversations/subscribers/conversation.subscriber';
import { UserSubscriber } from '@wlodzimierz/application/src/lib/storage/users/subscribers/user.subscriber';

@Component({
  selector: 'wlodzimierz-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit, OnDestroy {
  @Output() conversationChanged: EventEmitter<ConversationModel> = new EventEmitter<ConversationModel>();
  public conversationModel: ConversationModel;
  public currentConversationModel: ConversationModel;
  public currentUser: UserModel;
  private conversationSubscriber: ConversationSubscriber = new ConversationSubscriber();
  private currentConversationSubscriber: ConversationSubscriber = new ConversationSubscriber();
  private userSubscriber: UserSubscriber = new UserSubscriber();

  ///////////////////////////////////////////////////////////////////////////
  // Processing the received another conversation from a parent component
  ///////////////////////////////////////////////////////////////////////////

  public get conversation(): ConversationModel {
    return this.conversationSubscriber.model;
  }

  @Input()
  public set conversation(value: ConversationModel) {
    this.conversationSubscriber.model = value;
  }

  ///////////////////////////////////////////////////////////////////////////
  // Processing the received current conversation from a parent component
  ///////////////////////////////////////////////////////////////////////////

  public get currentConversation(): ConversationModel {
    return this.currentConversationSubscriber.model;
  }

  @Input()
  public set currentConversation(value: ConversationModel) {
    this.currentConversationSubscriber.model = value;
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
    this.followConversation();
    this.followUser();
  }

  public ngOnDestroy(): void {
    this.conversationSubscriber.onDispose();
    this.currentConversationSubscriber.onDispose();
    this.userSubscriber.onDispose();
  }

  ///////////////////////////////////////////////////////////////////////////
  // Ignition events
  ///////////////////////////////////////////////////////////////////////////

  public onConversationChanged(conversation: ConversationModel): void {
    this.conversationModel = conversation;
    this.conversationChanged.emit(conversation);
  }

  ///////////////////////////////////////////////////////////////////////////
  // Helpers
  ///////////////////////////////////////////////////////////////////////////

  private followConversation() {
    this.conversationSubscriber.follow((model: ConversationModel) => (this.conversationModel = model));
    this.currentConversationSubscriber.follow((model: ConversationModel) => (this.currentConversationModel = model));
  }

  private followUser() {
    this.userSubscriber.follow((model: UserModel) => (this.currentUser = model));
  }
}
