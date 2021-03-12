import { Injectable, Pipe, PipeTransform } from '@angular/core';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Conversation } from '../models/conversation.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserModel } from '../../../../../users/src/lib/shared/models/user.model';

@Pipe({ name: 'interlocutor' })
@Injectable()
export class InterlocutorPipe implements PipeTransform {
  public transform(conversation: Conversation, user: UserModel): string {
    return conversation.rightUserId === user?.userId
      ? this.toString(conversation.leftUser)
      : this.toString(conversation.rightUser);
  }

  private toString(user: UserModel): string {
    return user.userName;
  }

  private toFullString(user: UserModel): string {
    return `${user.firstName} ${user.lastName}`;
  }
}
