export class ConversationModel {

  public constructor(
    public conversationId: number = 0,
    public leftUserId: string = '',
    public rightUserId: string = '') {
  }
}
