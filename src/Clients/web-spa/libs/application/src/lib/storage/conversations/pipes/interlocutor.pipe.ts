import { Injectable, Pipe, PipeTransform } from '@angular/core';

import { ConversationModel } from '@wlodzimierz/domain/src/lib/models/conversation.model';
import { UserModel } from '@wlodzimierz/domain/src/lib/models/user.model';

@Pipe({ name: 'interlocutor' })
@Injectable()
export class InterlocutorPipe implements PipeTransform {

  public transform(conversation: ConversationModel, user: UserModel): string {
    return conversation.rightUserId === user?.userId ? conversation.leftUser.userName : conversation.rightUser.userName;
  }
}
