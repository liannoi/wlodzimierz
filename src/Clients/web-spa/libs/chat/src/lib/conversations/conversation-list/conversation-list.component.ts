import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ConversationsList } from '../shared/models/conversations-list.models';
import { User } from '../../../../../users/src/lib/shared/models/user.model';
import { ChangeConversationEvent } from '../shared/events/change-conversation.event';
import { Conversation } from '../shared/models/conversation.model';

@Component({
  selector: 'wlodzimierz-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss']
})
export class ConversationListComponent {
  @Input() public user: User;
  @Input() public conversations: ConversationsList;
  @Output() public changeConversation: EventEmitter<ChangeConversationEvent> = new EventEmitter<ChangeConversationEvent>();
  public bindingConversation: Conversation;

  public onChangeConversation($event: ChangeConversationEvent): void {
    this.bindingConversation = $event.conversation;
    this.changeConversation.emit($event);
  }
}
