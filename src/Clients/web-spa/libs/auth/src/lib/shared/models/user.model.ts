export interface User {
  userId: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  photo: string;

  password: string;
  shouldRemember: boolean;
}

export const defaultUser = (): User => <User>({});
