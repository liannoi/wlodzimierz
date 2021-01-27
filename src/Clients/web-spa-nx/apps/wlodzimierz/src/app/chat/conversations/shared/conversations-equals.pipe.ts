import { Injectable, Pipe, PipeTransform } from '@angular/core';

import { ConversationModel } from '@wlodzimierz/domain/src/lib/models/conversation.model';

@Pipe({ name: 'cequals' })
@Injectable()
export class ConversationsEqualsPipe implements PipeTransform {

  public transform(first: ConversationModel, second: ConversationModel): boolean {
    return first?.conversationId === second?.conversationId;
  }
}
