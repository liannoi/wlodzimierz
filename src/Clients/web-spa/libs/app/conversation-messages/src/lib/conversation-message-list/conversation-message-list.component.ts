import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ConversationMessage } from '../shared/models/conversation-message.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Conversation } from '../../../../conversations/src/lib/shared/models/conversation.model';
import { ConversationMessagesList } from '../shared/models/conversation-messages-list.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserModel } from '../../../../../shared/storage/src/lib/users/models/user.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Identifiable } from '../../../../../shared/storage/src/lib/common/interfaces/identifiable.interface';

@Component({
  selector: 'wlodzimierz-conversation-message-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './conversation-message-list.component.html',
  styleUrls: ['./conversation-message-list.component.scss']
})
export class ConversationMessageListComponent implements Identifiable<ConversationMessage, number> {
  @Input() public conversation: Conversation;
  @Input() public messages: ConversationMessagesList;
  @Input() public user: UserModel;

  public identify(index: number, model: ConversationMessage): number {
    return model.conversationMessageId;
  }
}
