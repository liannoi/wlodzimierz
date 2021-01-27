import { Pipe, PipeTransform } from '@angular/core';

import { ConversationMessageModel } from '@wlodzimierz/domain/src/lib/models/conversation-message.model';

@Pipe({ name: 'reverse' })
export class ReversePipe implements PipeTransform {
  public transform(model: ConversationMessageModel[]): ConversationMessageModel[] {
    return model.slice().reverse();
  }
}
