import { BehaviorSubject } from 'rxjs';

import { AbstractSubscriber } from '@wlodzimierz/application/src/lib/common/subscribers/abstract.subscriber';
import { ConversationMessagesListModel } from '@wlodzimierz/domain/src/lib/models/conversation-messages-list.model';

export class ConversationMessageListSubscriber extends AbstractSubscriber<ConversationMessagesListModel> {
  public constructor() {
    super(new BehaviorSubject<ConversationMessagesListModel>(new ConversationMessagesListModel()));
  }
}
