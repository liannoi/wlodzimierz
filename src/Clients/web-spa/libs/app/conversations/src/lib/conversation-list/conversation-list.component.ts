import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { ConversationsList } from '../shared/models/conversations-list.model';
import { User } from '../../../../users/src/lib/shared/models/user.model';
import { ChangedNotification } from '../shared/notifications/change/changed.notification';
import { Conversation } from '../shared/models/conversation.model';

@Component({
  selector: 'wlodzimierz-conversation-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss']
})
export class ConversationListComponent {
  @Input() public user: User;
  @Input() public conversations: ConversationsList;
  @Output()
  public changeConversation: EventEmitter<ChangedNotification> = new EventEmitter<ChangedNotification>();
  public bindingConversation: Conversation;

  public onChangeConversation($event: ChangedNotification): void {
    this.bindingConversation = $event.conversation;
    this.changeConversation.emit($event);
  }
}
