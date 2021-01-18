const authRoutingConstants: AuthRoutingConstants = {
  SignIn: 'auth/sign-in',
  SignUp: 'auth/sign-up',
  SignOut: 'auth/sign-out',
};

interface AuthRoutingConstants {
  readonly SignIn: string;
  readonly SignUp: string;
  readonly SignOut: string;
}

export const AuthRoutingConstants: AuthRoutingConstants = authRoutingConstants;
