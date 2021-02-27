import { Injectable, Pipe, PipeTransform } from '@angular/core';

import { Conversation } from '../models/conversation.model';
import { User } from '../../../../../users/src/lib/shared/models/user.model';

@Pipe({ name: 'interlocutor' })
@Injectable()
export class InterlocutorPipe implements PipeTransform {
  public transform(conversation: Conversation, user: User): string {
    return conversation.rightUserId === user?.userId
      ? conversation.leftUser.userName
      : conversation.rightUser.userName;
  }
}
