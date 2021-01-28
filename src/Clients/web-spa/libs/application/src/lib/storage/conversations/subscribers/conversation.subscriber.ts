import { BehaviorSubject } from 'rxjs';

import { AbstractSubscriber } from '@wlodzimierz/application/src/lib/common/subscribers/abstract.subscriber';
import { ConversationModel } from '@wlodzimierz/domain/src/lib/models/conversation.model';

export class ConversationSubscriber extends AbstractSubscriber<ConversationModel> {
  public constructor() {
    super(new BehaviorSubject<ConversationModel>(new ConversationModel()));
  }
}
