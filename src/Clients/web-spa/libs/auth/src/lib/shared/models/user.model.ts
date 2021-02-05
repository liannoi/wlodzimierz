export class UserModel {
  public constructor(
    public userId: string = '',
    public userName: string = '',
    public password: string = '',
    public email: string = '',
    public firstName: string = '',
    public lastName: string = '',
    public photo: string = '',
    public shouldRemember: boolean = false) {
  }
}
