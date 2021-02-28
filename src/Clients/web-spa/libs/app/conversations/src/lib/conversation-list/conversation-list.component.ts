import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { ConversationsList } from '../shared/models/conversations-list.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserModel } from '../../../../users/src/lib/shared/models/user.model';
import { ChangedNotification } from '../shared/notifications/change/changed.notification';
import { Conversation } from '../shared/models/conversation.model';

@Component({
  selector: 'wlodzimierz-conversation-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss']
})
export class ConversationListComponent {
  @Input() public user: UserModel;
  @Input() public conversations: ConversationsList;
  @Output() public changeConversation: EventEmitter<ChangedNotification> = new EventEmitter<ChangedNotification>();
  public bindingConversation: Conversation;

  public onChangeConversation($event: ChangedNotification): void {
    this.bindingConversation = $event.conversation;
    this.changeConversation.emit($event);
  }
}
