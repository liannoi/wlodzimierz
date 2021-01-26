import { Component, Inject, Input, OnInit } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { ConversationsServiceImpl } from '@wlodzimierz/infrastructure/src/lib/storage/conversations/conversations.service';
import { ConversationsService } from '@wlodzimierz/application/src/lib/storage/conversations/conversations.service';
import { ConversationMessagesListModel } from '@wlodzimierz/domain/src/lib/models/conversation-messages-list.model';
import { ConversationModel } from '@wlodzimierz/domain/src/lib/models/conversation.model';
import { UserModel } from '@wlodzimierz/domain/src/lib/models/user.model';
import { UsernameExtractorImpl } from '@wlodzimierz/infrastructure/src/lib/extractors/username.extractor';
import { UsernameExtractor } from '@wlodzimierz/application/src/lib/common/extractors/username.extractor';

@Component({
  selector: 'wlodzimierz-conversation-message-list',
  templateUrl: './conversation-message-list.component.html',
  styleUrls: ['./conversation-message-list.component.scss']
})
export class ConversationMessageListComponent implements OnInit {

  public user: UserModel;
  private messagesSubject = new BehaviorSubject<ConversationMessagesListModel>(new ConversationMessagesListModel());
  private conversationSubject = new BehaviorSubject<ConversationModel>(new ConversationModel());

  public constructor(
    @Inject(ConversationsServiceImpl) private conversationsService: ConversationsService,
    @Inject(UsernameExtractorImpl) private usernameExtractor: UsernameExtractor) {
  }

  public get messages(): ConversationMessagesListModel {
    return this.messagesSubject.getValue();
  }

  @Input()
  public set messages(value: ConversationMessagesListModel) {
    this.messagesSubject.next(value);
  }

  public get conversation(): ConversationModel {
    return this.conversationSubject.getValue();
  }

  @Input()
  public set conversation(value: ConversationModel) {
    this.conversationSubject.next(value);
  }

  public ngOnInit(): void {
    this.refresh();
  }

  public isMyMessage(ownerUserId: string): boolean {
    return ownerUserId === this.user.userId;
  }

  public takeUserName(): string {
    return this.usernameExtractor.extract(this.conversation, this.user);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private refresh(): void {
  }
}
