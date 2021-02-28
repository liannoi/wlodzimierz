export interface UserModel {
  userId: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  photo: string;

  password: string;
  shouldRemember: boolean;
}
