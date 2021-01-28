import { Component, Input, OnInit } from '@angular/core';

import { ConversationMessageModel } from '@wlodzimierz/domain/src/lib/models/conversation-message.model';
import { UserModel } from '@wlodzimierz/domain/src/lib/models/user.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'wlodzimierz-conversation-message',
  templateUrl: './conversation-message.component.html',
  styleUrls: ['./conversation-message.component.scss']
})
export class ConversationMessageComponent implements OnInit {
  public currentMessage: ConversationMessageModel;
  public currentUser: UserModel;
  private messageSubject: BehaviorSubject<ConversationMessageModel> = new BehaviorSubject<ConversationMessageModel>(new ConversationMessageModel());
  private userSubject: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(new UserModel());

  ///////////////////////////////////////////////////////////////////////////
  // Processing the received message from a parent component
  ///////////////////////////////////////////////////////////////////////////

  public get message(): ConversationMessageModel {
    return this.messageSubject.getValue();
  }

  @Input()
  public set message(value: ConversationMessageModel) {
    this.messageSubject.next(value);
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
    this.followUser();
    this.followMessage();
  }

  ///////////////////////////////////////////////////////////////////////////
  // Helpers
  ///////////////////////////////////////////////////////////////////////////

  private followUser(): void {
    this.userSubject.subscribe((user: UserModel) => this.currentUser = user);
  }

  private followMessage(): void {
    this.messageSubject.subscribe((message: ConversationMessageModel) => this.currentMessage = message);
  }
}
