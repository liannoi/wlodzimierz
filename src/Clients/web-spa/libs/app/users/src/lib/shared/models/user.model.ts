export interface UserModel {
  userId: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  photo: string;
  twoFactorEnabled: boolean;
  hasAuthenticator: boolean;
  twoFactorClientRemembered: boolean;

  password: string;
  shouldRemember: boolean;
}
