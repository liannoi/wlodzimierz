import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ConversationMessage } from '../shared/models/conversation-message.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserModel } from '../../../../users/src/lib/shared/models/user.model';
import { DateService } from '../../../../../shared/date/src/lib/services/date.service';

@Component({
  selector: 'wlodzimierz-conversation-message',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './conversation-message.component.html',
  styleUrls: ['./conversation-message.component.scss']
})
export class ConversationMessageComponent {
  @Input() public message: ConversationMessage;
  @Input() public user: UserModel;

  public constructor(private dateService: DateService) {
  }

  public get date(): string {
    return this.dateService.toFull(this.message.publish);
  }
}
