import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Conversation } from '../shared/models/conversation.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserModel } from '../../../../users/src/lib/shared/models/user.model';
import { ChangedNotification } from '../shared/notifications/change/changed.notification';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { DateService } from '../../../../../shared/date/src/lib/services/date.service';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries

@Component({
  selector: 'wlodzimierz-conversation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent {
  @Input() public user: UserModel;
  @Input() public conversation: Conversation;
  @Input() public bindingConversation: Conversation;
  @Output()
  public changeConversation: EventEmitter<ChangedNotification> = new EventEmitter<ChangedNotification>();

  public constructor(private dateService: DateService) {
  }

  public get lastMessage(): string {
    const result = this.conversation.lastMessage?.message;

    return result ? result : '(empty)';
  }

  public get date(): string {
    const publish = this.conversation.lastMessage?.publish;

    return publish ? this.dateService.toToday(publish) : '';
  }

  public onChangeConversation(): void {
    this.changeConversation.emit({ conversation: this.conversation });
  }
}
