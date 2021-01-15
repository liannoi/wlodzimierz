import {Component, Input, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

import {BehaviorSubject} from 'rxjs';

import {ConversationModel} from '../shared/models/conversation.model';
import {ConversationsService} from '../conversations.service';
import {OnMessagesHandler} from '../shared/queries/messages/on-messages.handler';
import {ConversationMessagesListModel} from '../../conversation-messages/shared/models/conversation-messages-list.model';
import {MessagesQuery} from '../shared/queries/messages/messages.query';

@Component({
  selector: 'app-conversation-messages',
  templateUrl: './conversation-messages.component.html',
  styleUrls: ['./conversation-messages.component.scss']
})
export class ConversationMessagesComponent implements OnInit, OnMessagesHandler {

  public messages: ConversationMessagesListModel = new ConversationMessagesListModel();

  private currentConversation!: ConversationModel;
  private conversationSubject = new BehaviorSubject<ConversationModel>(new ConversationModel());

  public constructor(private conversationsService: ConversationsService) {
  }

  public get conversation(): ConversationModel {
    return this.conversationSubject.getValue();
  }

  @Input()
  public set conversation(value) {
    this.conversationSubject.next(value);
  }

  public async ngOnInit() {
    const isRefreshed = false;

    if (!isRefreshed) {
      this.refresh();
    }
  }

  public onMessagesFetchedFailed(error: HttpErrorResponse): void {
  }

  public onMessagesFetchedSuccess(messages: ConversationMessagesListModel): void {
    this.messages = messages;
  }

  private refresh() {
    this.conversationSubject.subscribe((model: ConversationModel) => {
      if (!model) {
        return;
      }

      this.currentConversation = model;
      this.conversationsService.getAllMessages(new MessagesQuery(model.conversationId), this);
    });
  }
}
