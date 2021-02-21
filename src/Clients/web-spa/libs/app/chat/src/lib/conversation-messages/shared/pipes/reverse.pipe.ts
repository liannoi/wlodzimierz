import { Injectable, Pipe, PipeTransform } from '@angular/core';

import { ConversationMessage } from '../models/conversation-message.model';

@Pipe({ name: 'reverse' })
@Injectable()
export class ReversePipe implements PipeTransform {
  public transform(model: ConversationMessage[]): ConversationMessage[] {
    return model?.slice().reverse();
  }
}
