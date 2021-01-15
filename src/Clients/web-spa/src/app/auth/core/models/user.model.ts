export class UserModel {
  public constructor(
    public userId: string = '',
    public username: string = '',
    public email: string = '',
    public password: string = '',
    public shouldRemember: boolean = false) {
  }
}
