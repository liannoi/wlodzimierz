import { BehaviorSubject } from 'rxjs';

import { AbstractSubscriber } from '@wlodzimierz/application/src/lib/common/subscribers/abstract.subscriber';
import { ConversationMessageModel } from '@wlodzimierz/domain/src/lib/models/conversation-message.model';

export class ConversationMessageSubscriber extends AbstractSubscriber<ConversationMessageModel> {
  public constructor() {
    super(new BehaviorSubject<ConversationMessageModel>(new ConversationMessageModel()));
  }
}
