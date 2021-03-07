import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ConversationMessage } from '../shared/models/conversation-message.model';
import { UserModel } from '../../../../../shared/storage/src/lib/users/models/user.model';

@Component({
  selector: 'wlodzimierz-conversation-message',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './conversation-message.component.html',
  styleUrls: ['./conversation-message.component.scss']
})
export class ConversationMessageComponent {
  @Input() public message: ConversationMessage;
  @Input() public user: UserModel;
}
