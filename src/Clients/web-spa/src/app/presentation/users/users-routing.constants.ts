const usersRoutingConstants: UsersRoutingConstants = {
  SignUp: 'join',
  SignIn: 'login',
  SignOut: 'sign-out',
};

interface UsersRoutingConstants {
  readonly SignIn: string;
  readonly SignUp: string;
  readonly SignOut: string;
}

export const UsersRoutingConstants: UsersRoutingConstants = usersRoutingConstants;
