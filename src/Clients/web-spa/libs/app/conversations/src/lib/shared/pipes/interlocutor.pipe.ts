import { Injectable, Pipe, PipeTransform } from '@angular/core';

import { Conversation } from '../models/conversation.model';
import { UserModel } from '../../../../../../shared/storage/src/lib/users/models/user.model';

@Pipe({ name: 'interlocutor' })
@Injectable()
export class InterlocutorPipe implements PipeTransform {
  public transform(conversation: Conversation, user: UserModel): string {
    return conversation.rightUserId === user?.userId
      ? conversation.leftUser.userName
      : conversation.rightUser.userName;
  }
}
