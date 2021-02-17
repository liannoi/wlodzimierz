import { Injectable, Pipe, PipeTransform } from '@angular/core';

import { Conversation } from '../models/conversation.model';

@Pipe({ name: 'cequals' })
@Injectable()
export class ConversationsEqualsPipe implements PipeTransform {
  public transform(first: Conversation, second: Conversation): boolean {
    return first?.conversationId === second?.conversationId;
  }
}
