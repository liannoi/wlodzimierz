import { UserModel } from '@wlodzimierz/domain/src/lib/models/user.model';

export class ConversationModel {
  public constructor(
    public conversationId: number = 0,
    public leftUserId: string = '',
    public leftUser: UserModel = new UserModel(),
    public rightUserId: string = '',
    public rightUser: UserModel = new UserModel()) {
  }
}

