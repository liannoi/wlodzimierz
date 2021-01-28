import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConversationModel } from '@wlodzimierz/domain/src/lib/models/conversation.model';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from '@wlodzimierz/domain/src/lib/models/user.model';

@Component({
  selector: 'wlodzimierz-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {
  @Output() conversationChanged: EventEmitter<ConversationModel> = new EventEmitter<ConversationModel>();
  public conversationModel: ConversationModel;
  public currentConversationModel: ConversationModel;
  public currentUser: UserModel;
  private conversationSubject: BehaviorSubject<ConversationModel> = new BehaviorSubject<ConversationModel>(new ConversationModel());
  private currentConversationSubject: BehaviorSubject<ConversationModel> = new BehaviorSubject<ConversationModel>(new ConversationModel());
  private userSubject: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(new UserModel());

  ///////////////////////////////////////////////////////////////////////////
  // Processing the received another conversation from a parent component
  ///////////////////////////////////////////////////////////////////////////

  public get conversation(): ConversationModel {
    return this.conversationSubject.getValue();
  }

  @Input()
  public set conversation(value: ConversationModel) {
    this.conversationSubject.next(value);
  }

  ///////////////////////////////////////////////////////////////////////////
  // Processing the received current conversation from a parent component
  ///////////////////////////////////////////////////////////////////////////

  public get currentConversation(): ConversationModel {
    return this.currentConversationSubject.getValue();
  }

  @Input()
  public set currentConversation(value: ConversationModel) {
    this.currentConversationSubject.next(value);
  }

  ///////////////////////////////////////////////////////////////////////////
  // Processing the received user from a parent component
  ///////////////////////////////////////////////////////////////////////////

  public get user(): UserModel {
    return this.userSubject.getValue();
  }

  @Input()
  public set user(value: UserModel) {
    this.userSubject.next(value);
  }

  ///////////////////////////////////////////////////////////////////////////
  // Interface handlers
  ///////////////////////////////////////////////////////////////////////////

  public ngOnInit(): void {
    this.followConversation();
    this.followUser();
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
    this.conversationSubject.subscribe((model: ConversationModel) => (this.conversationModel = model));
    this.currentConversationSubject.subscribe((model: ConversationModel) => (this.currentConversationModel = model));
  }

  private followUser() {
    this.userSubject.subscribe((model: UserModel) => (this.currentUser = model));
  }
}
